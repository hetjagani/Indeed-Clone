const { errors } = require('u-server-utils');
const { uploadFileToS3 } = require('../util/fileUtilS3');

const createMedia = async (req, res) => {
  try {
    const uploadedPhoto = await uploadFileToS3(req.file);
    res.status(201).json({ url: uploadedPhoto.Location });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

module.exports = { createMedia };
