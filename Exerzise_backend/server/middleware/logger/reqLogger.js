const logger = (req, res, next) => {
  console.log(`req params ${req.params.userId}`);
  // console.log(`req query`);
  console.log(`route ${req.url} called`);
  next();
};

module.exports = logger;
