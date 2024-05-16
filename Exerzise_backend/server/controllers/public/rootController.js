const upload = async (req, res) => {
  res
    .status(200)
    .json({ route: `${req.path}`, message: "Welcome to rootpage" });
};

module.exports = upload;
