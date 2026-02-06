exports.success = (res, data, message = "OK") => {
  res.json({
    success: true,
    message,
    data
  });
};

exports.error = (res, message = "Error", code = 500) => {
  res.status(code).json({
    success: false,
    message
  });
};
