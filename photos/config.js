/* eslint-disable global-require */
try {
  const config = require('./config.json');
  const environment = process.env.NODE_ENV || 'development';
  const finalConfig = config[environment];

  global.gConfig = finalConfig;
} catch (err) {
  console.error('Config file not found');
  process.exit(1);
}
