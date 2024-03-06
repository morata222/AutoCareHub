const errorHandler = (error, req, res, next) => {
  console.log(error);
  let cutomError = {
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong try again later",
  };

  return res
    .status(cutomError.statusCode)
    .json({ message: cutomError.message });
};

module.exports = errorHandler;
