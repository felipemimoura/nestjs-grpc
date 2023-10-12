import { status } from '@grpc/grpc-js';
import { BadRequestException, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException) {
    const rpcException = new RpcException({
      //@ts-expect-error - message is private
      message: JSON.stringify(exception.getResponse().message),
      code: status.FAILED_PRECONDITION,
    });
    return throwError(() => rpcException.getError());
  }
}
