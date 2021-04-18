import { Logger } from '@app/core/logging/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private logger: Logger
  ) {
    logger.setContext(AppService.name)
  }
  getHello(): string {
    return 'Hello World! [web]';
  }
}
