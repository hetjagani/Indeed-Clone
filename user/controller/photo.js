/* eslint-disable no-underscore-dangle */
const { errors } = require('u-server-utils');
const fs = require('fs');
const FormData = require('form-data');
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');

const getUserPhotos = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await axios.get(`${global.gConfig.photos_url}/photos`, {
      params: {
        userId: id,
        page: req.query.page,
        limit: req.query.limit,
        isFeatured: req.query.isFeatured,
      },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getUserPhotoById = async (req, res) => {
  try {
    const { id, photoId } = req.params;

    const result = await axios.get(
      `${global.gConfig.photos_url}/photos/${photoId}`,
      {
        params: { userId: id },
        headers: { Authorization: req.headers.authorization },
      },
    );

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const createUserPhoto = async (req, res) => {
  try {
    const { user } = req.headers;
    if (user !== req.params.id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id in path should be same as logged in user',
      });
      return;
    }

    // const valErr = validationResult(req);
    // if (!valErr.isEmpty()) {
    //   console.error(valErr);
    //   res.status(400).json({ status: 400, message: valErr.array() });
    //   return;
    // }

    const { isFeatured, companyId } = req.body;
    const status = 'PENDING';

    const contents = fs.readFileSync(req.file.path);

    const data = new FormData();
    data.append('imageData', contents, req.file.originalname);
    data.append('isFeatured', isFeatured);
    data.append('companyId', companyId);
    data.append('userId', user);
    data.append('status', status);

    const response = await axios.post(
      `${global.gConfig.photos_url}/photos`,
      data,
      {
        headers: {
          Authorization: req.headers.authorization,
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      },
    );

    if (!response) {
      res.status(500).json(errors.serverError);
      return;
    }

    if (response.status === 201) res.status(201).json(response.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const updateUserPhoto = async (req, res) => {
  const { id, photoId } = req.params;

  const { user } = req.headers;
  if (user !== id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'id in path should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const { isFeatured } = req.body;

  try {
    const result = await axios.put(
      `${global.gConfig.photos_url}/photos/${photoId}`,
      { isFeatured },
      {
        params: { userId: id },
        headers: { Authorization: req.headers.authorization },
      },
    );

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const deleteUserPhoto = async (req, res) => {
  try {
    const { id, photoId } = req.params;

    const { user } = req.headers;
    if (user !== id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id in path should be same as logged in user',
      });
      return;
    }

    const result = await axios.delete(
      `${global.gConfig.photos_url}/photos/${photoId}`,
      {
        params: { userId: id },
        headers: { Authorization: req.headers.authorization },
      },
    );

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getUserPhotos,
  getUserPhotoById,
  createUserPhoto,
  deleteUserPhoto,
  updateUserPhoto,
};
