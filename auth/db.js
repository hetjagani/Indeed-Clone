const { Sequelize } = require('sequelize');

if (!global.gConfig.database_host) {
  console.error('please provide database_host in config file...');
}

if (!global.gConfig.database_user) {
  console.error('please provide database_user in config file...');
}

if (!global.gConfig.database_password) {
  console.error('please provide database_password in config file...');
}

if (!global.gConfig.database_name) {
  console.error('please provide database_name in config file...');
}

const initDB = async () => {
  if (global.DB) {
    return Promise.resolve(global.DB);
  }
  global.DB = new Sequelize(
    global.gConfig.database_name,
    global.gConfig.database_user,
    global.gConfig.database_password,
    {
      host: global.gConfig.database_host,
      dialect: 'mysql',
      logging: console.log,
    },
  );

  return global.DB.authenticate()
    .then(() => {
      console.log('Connected to database...');
      return Promise.resolve(global.DB);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = {
  initDB,
};
