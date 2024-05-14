const logger = (req, res, next) => {
  console.log("logger works!");
  console.log("this is", req.url);
  next();
};

module.exports = logger;
