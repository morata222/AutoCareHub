const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route is not exist" });
};

module.exports = notFound;
