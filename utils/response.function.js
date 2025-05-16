const successRes = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  const catchRes = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message: error.message ,
      error
    });
  };

  const errorRes = (res, message,statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message
    });
  };
  
  module.exports = {
    successRes,
    catchRes,
    errorRes
  };
  