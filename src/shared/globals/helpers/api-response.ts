import HTTP_STATUS from 'http-status-codes';
import { Response } from 'express';

export default class ApiResponse {
  static response = (res: Response, statusCode: number, payload?: Object, message?: string, extra = {}) => {
    const success = statusCode === HTTP_STATUS.OK || statusCode === HTTP_STATUS.CREATED ? true : false;
    res.status(statusCode).send({
      status: statusCode,
      success,
      message,
      data: payload,
      ...extra
    });
  };

  static ok = (res: Response, payload?: Object, message?: string) => {
    const msg = message ?? 'success';
    const status: number = HTTP_STATUS.OK;
    return ApiResponse.response(res, status, payload, msg);
  };

  static created = (res: Response, payload?: Object, message?: string) => {
    const msg = message ?? 'success';
    const status: number = HTTP_STATUS.CREATED;
    return ApiResponse.response(res, status, payload, msg);
  };

  static customError = (res: Response, statusCode?: number, message = 'Error occured', stack?: any) => {
    const status: number = statusCode ?? HTTP_STATUS.BAD_REQUEST;
    return ApiResponse.response(res, status, '', message, stack);
  };
}
