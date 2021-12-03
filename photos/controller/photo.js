/* eslint-disable consistent-return */
const { errors, getPagination } = require('u-server-utils');
const { Photo } = require('../model');
const { uploadFileToS3, deleteFileFromS3 } = require('../util/fileUtilS3');

const addPhoto = async (req, res) => {
  try {
    const { isFeatured, userId, companyId, status } = req.body;
    const { originalname } = req.file;

    if (!(isFeatured && userId && companyId)) {
      return res.status(400).json(errors.badRequest);
    }

    const uploadedPhoto = await uploadFileToS3(req.file);

    const photoObj = await Photo.create({
      _id: uploadedPhoto.Key,
      isFeatured: isFeatured === 'true',
      altText: originalname,
      userId,
      companyId,
      url: uploadedPhoto.Location,
      status,
    });

    return res.status(201).json(photoObj);
  } catch (error) {
    console.log(error);
    return res.status(500).json(errors.serverError);
  }
};

const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(errors.badRequest);
    }

    const whereQ = { _id: id };
    const { userId, companyId } = req.query;

    if (userId && userId !== '') {
      whereQ.userId = userId;
    }

    if (companyId && companyId !== '') {
      whereQ.companyId = companyId;
    }

    const photo = await Photo.findOne({
      where: whereQ,
    });

    if (!photo) {
      res.status(404).json(errors.notFound);
      return;
    }

    return res.status(200).json(photo);
  } catch (err) {
    return res.status(500).json(errors.serverError);
  }
};

const getAllPhotos = async (req, res) => {
  const { userId, companyId, isFeatured, status } = req.query;

  try {
    const { limit, offset } = getPagination(req.query.page, req.query.limit);

    const queryObj = {};
    if (userId) {
      queryObj.userId = userId;
    }
    if (companyId) {
      queryObj.companyId = companyId;
    }
    if (isFeatured && isFeatured == 'true') {
      queryObj.isFeatured = true;
    } else if (isFeatured == 'false') {
      queryObj.isFeatured = false;
    }

    if (status && status != '') {
      queryObj.status = status;
    }

    const photos = await Photo.findAndCountAll({
      where: queryObj,
      limit,
      offset,
    });

    return res.status(200).json({ total: photos.count, nodes: photos.rows });
  } catch (err) {
    return res.status(500).json(errors.serverError);
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!(id && req.body)) {
      return res.status(400).json(errors.badRequest);
    }

    const whereQ = { _id: id };
    const { userId, companyId } = req.query;

    if (userId && userId !== '') {
      whereQ.userId = userId;
    }

    if (companyId && companyId !== '') {
      whereQ.companyId = companyId;
    }

    const { altText, isFeatured, status } = req.body;
    const photo = await Photo.findOne({
      where: whereQ,
    });

    if (altText) {
      photo.altText = altText;
    }
    if (status) {
      photo.status = status;
    }
    photo.isFeatured = isFeatured;
    await photo.save();

    return res.status(200).json(photo);
  } catch (err) {
    return res.status(500).json(errors.serverError);
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(errors.badRequest);
    }

    const whereQ = { _id: id };
    const { userId, companyId } = req.query;

    if (userId && userId !== '') {
      whereQ.userId = userId;
    }

    if (companyId && companyId !== '') {
      whereQ.companyId = companyId;
    }

    const photo = await Photo.findOne({
      where: whereQ,
    });

    await photo.destroy();
    deleteFileFromS3(id);

    return res.status(200).json(null);
  } catch (err) {
    return res.status(500).json(errors.serverError);
  }
};

module.exports = {
  addPhoto,
  getPhotoById,
  getAllPhotos,
  deletePhoto,
  updatePhoto,
};
