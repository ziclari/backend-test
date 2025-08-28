import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(
      'Error capturado:',
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );
    super.catch(exception, host);
  }
}
