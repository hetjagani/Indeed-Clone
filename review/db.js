const mongoose = require('mongoose');

if (!global.gConfig.database_conn) {
  console.error('please provide database_conn in config file...');
}

const initDB = () => {
  mongoose.connect(global.gConfig.database_conn);
  mongoose.set('debug', true);
};

module.exports = {
  initDB,
};
