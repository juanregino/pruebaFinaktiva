import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T | null;
  path: string;
  timestamp: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        if ((exceptionResponse as any).message) {
          // If the message is an array (validation errors), join the messages
          if (Array.isArray((exceptionResponse as any).message)) {
            message = (exceptionResponse as any).message.join(', ');
          } else {
            message = (exceptionResponse as any).message;
          }
        } else {
          message = JSON.stringify(exceptionResponse);
        }
      } else {
        message = 'An error occurred';
      }
    } else {
      // Attempt to extract message from generic errors
      message = (exception as any).message || 'Internal server error';
    }

    const errorResponse: ApiResponse<null> = {
      status: 'error',
      message: message,
      data: null,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
