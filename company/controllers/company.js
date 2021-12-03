/* eslint-disable no-underscore-dangle */
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Company } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllReviews = async (auth) => {
  const allReviews = await axios.get(`${global.gConfig.review_url}/reviews`, {
    headers: {
      Authorization: auth,
    },
    params: {
      all: true,
    },
  });

  return allReviews.data;
};

const getAvgReviewData = async (auth) => {
  const resp = await axios.get(`${global.gConfig.review_url}/reviews`, {
    headers: {
      Authorization: auth,
    },
    params: {
      all: true,
    },
  });

  if (!resp) {
    throw Error('no response from reviews service');
  }

  const avgReviewMap = {};
  resp.data.forEach((r) => {
    const { companyId } = r;

    if (avgReviewMap[companyId]) {
      const {
        totalReviews,
        overallRating,
        workLifeBalance,
        compensation,
        jobSecurity,
        management,
        jobCulture,
      } = avgReviewMap[companyId];
      // avgReviewMap[companyId].totalReviews += 1;
      avgReviewMap[companyId].overallRating =
        (overallRating * totalReviews + r.overallRating) / (totalReviews + 1);
      avgReviewMap[companyId].workLifeBalance =
        (workLifeBalance * totalReviews + r.workLifeBalance) / (totalReviews + 1);
      avgReviewMap[companyId].compensation =
        (compensation * totalReviews + r.compensation) / (totalReviews + 1);
      avgReviewMap[companyId].jobSecurity =
        (jobSecurity * totalReviews + r.jobSecurity) / (totalReviews + 1);
      avgReviewMap[companyId].management =
        (management * totalReviews + r.management) / (totalReviews + 1);
      avgReviewMap[companyId].jobCulture =
        (jobCulture * totalReviews + r.jobCulture) / (totalReviews + 1);

      avgReviewMap[companyId].totalReviews += 1;
    } else {
      avgReviewMap[companyId] = {
        overallRating: r.overallRating,
        workLifeBalance: r.workLifeBalance,
        compensation: r.compensation,
        jobSecurity: r.jobSecurity,
        management: r.management,
        jobCulture: r.jobCulture,
        totalReviews: 1,
      };
    }
  });

  return avgReviewMap;
};

const getAvgSalaryData = async (auth) => {
  const resp = await axios.get(`${global.gConfig.user_url}/salaries`, {
    headers: {
      Authorization: auth,
    },
    params: {
      all: true,
    },
  });

  if (!resp) {
    throw Error('no response from user service');
  }

  const avgSalaryMap = {};
  resp.data.forEach((s) => {
    const { companyId } = s;

    if (avgSalaryMap[companyId]) {
      const { totalSalaries, salary } = avgSalaryMap[companyId];
      avgSalaryMap[companyId].salary = (salary * totalSalaries + s.salary) / (totalSalaries + 1);
      avgSalaryMap[companyId].totalSalaries += 1;
    } else {
      avgSalaryMap[companyId] = {
        salary: s.salary,
        totalSalaries: 1,
      };
    }
  });
  return avgSalaryMap;
};

const getAllCompanies = async (req, res) => {
  try {
    const { all, q, city, byReviewed, byRatings } = req.query;
    const { limit, offset } = getPagination(req.query.page, req.query.limit);

    if (all) {
      const companies = await Company.find({});
      const avgReviewMap = await getAvgReviewData(req.headers.authorization);
      const avgSalaryMap = await getAvgSalaryData(req.headers.authorization);

      const result = companies.map((c) => ({
        ...avgReviewMap[c._id.toString()],
        ...avgSalaryMap[c._id.toString()],
        ...c._doc,
      }));

      res.status(200).json(result);
      return;
    }

    const whereOpts = {};
    if (q) {
      whereOpts.name = { $regex: `(?i)${q}` };
    }

    if (city && city !== '') {
      whereOpts.headquarters = { $regex: `(?i)${city}` };
    }

    const companyCount = await Company.count(whereOpts);
    const companyList = await Company.aggregate([
      { $match: whereOpts },
      {
        $lookup: {
          from: 'employers',
          localField: 'employers',
          foreignField: '_id',
          as: 'employers',
        },
      },
    ])
      .skip(offset)
      .limit(limit);

    const avgReviewMap = await getAvgReviewData(req.headers.authorization);
    const avgSalaryMap = await getAvgSalaryData(req.headers.authorization);
    const result = companyList.map((c) => ({
      ...avgReviewMap[c._id.toString()],
      ...avgSalaryMap[c._id.toString()],
      ...c,
    }));

    if (byReviewed && byReviewed == 'true') {
      const sortedByReviewed = result.sort((a, b) => {
        if (!a.totalReviews) {
          return 1;
        }
        if (!b.totalReviews) {
          return -1;
        }
        return b.totalReviews - a.totalReviews;
      });
      const topFive = sortedByReviewed.slice(0, 5);
      res.status(200).json({ nodes: topFive });
      return;
    }

    if (byRatings && byRatings == 'true') {
      const sortedByRaings = result.sort((a, b) => {
        if (!a.overallRating) {
          return 1;
        }
        if (!b.overallRating) {
          return -1;
        }
        return b.overallRating - a.overallRating;
      });
      const topFive = sortedByRaings.slice(0, 5);
      res.status(200).json({ nodes: topFive });
      return;
    }

    res.status(200).json({ total: companyCount, nodes: result });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const companyList = await Company.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'employers',
          localField: 'employers',
          foreignField: '_id',
          as: 'employers',
        },
      },
    ]);

    const avgReviewMap = await getAvgReviewData(req.headers.authorization);
    const avgSalaryMap = await getAvgSalaryData(req.headers.authorization);

    if (companyList.length === 0) {
      res.status(404).json(errors.notFound);
      return;
    }

    res.status(200).json({
      ...companyList[0],
      ...avgReviewMap[companyList[0]._id.toString()],
      ...avgSalaryMap[companyList[0]._id.toString()],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const createCompany = async (req, res) => {
  try {
    const { user } = req.headers;

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const company = req.body;
    company.employers = [user];

    makeRequest('company.create', { company, user }, async (err, resp) => {
      if (err) {
        res.status(500).json(errors.serverError);
        return;
      }

      const { _id } = resp;

      const companyList = await Company.aggregate([
        { $match: { _id: Types.ObjectId(_id) } },
        {
          $lookup: {
            from: 'employers',
            localField: 'employers',
            foreignField: '_id',
            as: 'employers',
          },
        },
      ]);

      res.status(201).json(companyList[0]);
    });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const { user } = req.headers;

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const company = req.body;
    delete company.employers;

    const dbCompany = await Company.findById(Types.ObjectId(id));
    if (!dbCompany) {
      res.status(404).json(errors.notFound);
      return;
    }

    // check if employer is in the company
    if (!dbCompany.employers.find((e) => e.toString() === user)) {
      res.status(401).json(errors.unauthorized);
      return;
    }

    makeRequest('company.update', { id: dbCompany._id, data: company }, async (err, resp) => {
      if (err) {
        res.status(500).json(errors.serverError);
        return;
      }

      const { _id } = resp;

      const companyList = await Company.aggregate([
        { $match: { _id: Types.ObjectId(_id) } },
        {
          $lookup: {
            from: 'employers',
            localField: 'employers',
            foreignField: '_id',
            as: 'employers',
          },
        },
      ]);

      res.status(200).json(companyList[0]);
    });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const { user } = req.headers;
    const dbCompany = await Company.findById(Types.ObjectId(id));
    if (!dbCompany) {
      res.status(404).json(errors.notFound);
      return;
    }

    // check if employer is in the company
    if (
      !dbCompany.employers.find((e) => {
        console.log(user);
        console.log(e);
        return e.toString() === user;
      })
    ) {
      res.status(401).json(errors.unauthorized);
      return;
    }

    makeRequest('company.delete', { id: dbCompany._id }, async (err, resp) => {
      if (err) {
        res.status(500).json(errors.serverError);
        return;
      }

      if (resp.success) {
        res.status(200).json(null);
      } else {
        res.status(500).json(errors.serverError);
      }
    });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const topTenCeos = async (req, res) => {
  try {
    const allReviews = await getAllReviews(req.headers.authorization);

    // create map of companyId => # of ceoApprovals
    const companyMap = new Map();
    allReviews.forEach((rev) => {
      if (rev.ceoApproval) {
        if (companyMap.has(rev.companyId)) {
          companyMap.set(rev.companyId, companyMap.get(rev.companyId) + 1);
        } else {
          companyMap.set(rev.companyId, 1);
        }
      }
    });

    // sort map by values
    const sortedCompanyMap = new Map([...companyMap.entries()].sort((a, b) => b[1] - a[1]));

    const topTenCompanyIds = Array.from(sortedCompanyMap.keys()).slice(0, 10);

    // get ceo names of all those companies
    const companies = (await Company.find({ _id: { $in: topTenCompanyIds } })).map((c) => c.ceo);

    res.status(200).json(companies);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response?.status).json(err.response?.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  topTenCeos,
};
