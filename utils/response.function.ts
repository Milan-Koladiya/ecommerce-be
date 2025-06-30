import { Response } from "express";

const successRes = (res:Response, message:string, data:any = {}, statusCode:number = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  const catchRes = (res:Response, error:any, statusCode:number = 500) => {
    return res.status(statusCode).json({
      success: false,
      message: error.message ,
      error
    });
  };

  const errorRes = (res:Response, message:string,statusCode:number = 400) => {
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
  