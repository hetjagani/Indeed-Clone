const checkProperties = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === 'null' || obj[key] === '' || obj[key] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    }
  });
};

export default checkProperties;
