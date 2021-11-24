const { Types } = require('mongoose');
const { errors } = require('u-server-utils');
const { Company } = require('../model');

const employerCheckMiddleware = async (req, res, next) => {
  if (req.method === 'GET') {
    next();
    return;
  }
  const { compId } = req.params;
  const { user } = req.headers;
  const company = await Company.findById(Types.ObjectId(compId));

  if (!company) {
    res.status(401).json({ ...errors.unauthorized, message: 'company does not exist' });
    return;
  }

  if (!company.employers.find((e) => e.toString() === user)) {
    res
      .status(401)
      .json({ ...errors.unauthorized, message: 'employer does not belong to this company' });
    return;
  }

  req.params.compId = compId;

  next();
};

const employerCheckMiddlewareOnAll = async (req, res, next) => {
  const { compId } = req.params;
  const { user } = req.headers;
  const company = await Company.findById(Types.ObjectId(compId));

  if (!company) {
    res.status(401).json({ ...errors.unauthorized, message: 'company does not exist' });
    return;
  }

  if (!company.employers.find((e) => e.toString() === user)) {
    res
      .status(401)
      .json({ ...errors.unauthorized, message: 'employer does not belong to this company' });
    return;
  }

  req.params.compId = compId;

  next();
};

module.exports = { employerCheckMiddleware, employerCheckMiddlewareOnAll };
