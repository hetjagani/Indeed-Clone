const { ObjectId } = require('mongodb');
const { Photo } = require('../model');
const { uploadFileToS3, deleteFileFromS3 } = require('../util/imageUtilS3');
const { getPagination } = require('u-server-utils');

const addPhoto = async (req, res) => {
  try {
    const { isFeatured, userId, companyId } = req.body;
    const { originalname } = req.file;

    if (!(isFeatured && userId && companyId)) {
      return res.status(400).send('Bad Request');
    }

    const uploadedPhoto = await uploadFileToS3(req.file);

    const photoObj = await Photo.create({
      id: uploadedPhoto.Key,
      isFeatured: isFeatured === 'true' ? true : false,
      altText: originalname,
      userId: userId,
      companyId: companyId,
      url: uploadedPhoto.Location,
    });

    return res.status(201).send(photoObj);
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send('Bad Request');
    }

    const photo = await Photo.findOne({
      where: { id },
    });

    return res.status(200).send({ url: photo.url });
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
};

const getAllPhotos = async (req, res) => {
  const { page, limit, userId, companyId } = req.query;

  try {
    if (!(page && limit)) {
      return res.status(400).send('Bad Request');
    }
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const queryObj = {};
    if (userId) {
      queryObj.userId = userId;
    }
    if (companyId) {
      queryObj.companyId = companyId;
    }

    console.log(queryObj);
    const photos = await Photo.findAndCountAll({
      where: queryObj,
      limit: parseInt(limit),
      offset: offset,
    });

    return res.status(200).send({total: photos.count, photos: photos.rows})
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!(id && req.body)) {
      return res.status(400).send('Bad Request');
    }

    const { altText, isFeatured } = req.body;
    const photo = await Photo.findOne({
      where: { id },
    });

    if (altText) {
      photo.altText = altText;
    }
    if (isFeatured) {
      photo.isFeatured = isFeatured;
    }

    await photo.save();

    return res.status(200).send({ message: 'Photo Updated Successfully' });
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send('Bad Request');
    }

    const photo = await Photo.findOne({
      where: { id },
    });

    await photo.destroy();
    deleteFileFromS3(id);

    return res.status(200).send({ message: 'Photo Deleted Successfully' });
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  addPhoto,
  getPhotoById,
  getAllPhotos,
  deletePhoto,
  updatePhoto,
};
