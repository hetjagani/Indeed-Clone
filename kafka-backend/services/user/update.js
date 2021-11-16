const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  const { User } = getUserConnection();

  const id = msg._id;
  const updateObj = {
    name: msg.name,
    about: msg.about,
    emails: msg.emails,
    resumes: msg.resumes,
    coverLetters: msg.coverLetters,
    city: msg.city,
    state: msg.state,
    country: msg.country,
    zip: msg.zip,
    jobPreferences: msg.jobPreferences,
  };

  const checkProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      }
    });
  };

  checkProperties(updateObj);

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(String(id)),
      },
      {
        $set: updateObj,
      },
      {
        new: true,
      }
    );
    callback(null, user);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
