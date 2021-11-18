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

// const getToken = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).send('Bad Request');
//     return;
//   }

//   const user = await User.findOne({ where: { email } });

//   if (!user) {
//     res.status(401).send('Unauthorized');
//     return;
//   }

//   if (!(await validatePassHash(password, user.password))) {
//     res.status(401).send('Unauthorized');
//     return;
//   }

//   const accessToken = jwt.sign(
//     {
//       id: user.id,
//       role: user.role,
//     },
//     JWT_SECRET,
//     { expiresIn: '1d' },
//   );

//   res.json({ token: accessToken });
// };

// const signUp = async (req, res) => {
//   const { email, password, role } = req.body;

//   // validate email and password
//   if (!email || !password || !role) {
//     res.status(400).send('Bad Request');
//     return;
//   }
//   if (
//     !emailValidator.validate(email)
//     || !validatePassword(password)
//     || !(role === 'user' || role === 'employer')
//   ) {
//     res.status(400).json({
//       error: 'invalid email or password',
//       requirement:
//         'Email should be valid email. Password should have 8-100 length and should contain atleast one uppercase, lowercase and a digit. Role should be either user/employer.',
//     });
//     return;
//   }

//   const findUser = await User.findOne({ where: { email } });
//   if (findUser) {
//     res.status(304).json({ message: 'User already exist. Please try login.' });
//     return;
//   }

//   const passHash = await getPasswordHash(password);
//   const user = await User.create({
//     id: new ObjectId().toString(),
//     email,
//     password: passHash,
//     role,
//   });

//   if (!user) {
//     res.status(500).send('Internal Server Error');
//     return;
//   }

//   const accessToken = jwt.sign(
//     {
//       id: user.id,
//       role: user.role,
//     },
//     JWT_SECRET,
//     { expiresIn: '1d' },
//   );

//   res.json({ token: accessToken });
// };

// const validateToken = async (req, res) => {
//   if (!req.query.token) {
//     res.status(400).send('please provide token query parameter.');
//     return;
//   }

//   const { token } = req.query;

//   jwt.verify(token, JWT_SECRET, async (err, data) => {
//     if (err) {
//       res.status(401).send({ valid: false });
//       return;
//     }

//     const user = await User.findOne({ where: { id: data.id } });

//     if (!user) {
//       res.status(401).send('Unauthorized');
//       return;
//     }

//     res.status(200).json({ valid: true, role: data.role, user: user.id });
//   });
// };

module.exports = {
  addPhoto,
  getPhotoById,
  getAllPhotos,
  deletePhoto,
  updatePhoto,
};
