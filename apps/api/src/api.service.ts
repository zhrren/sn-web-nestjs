import { Injectable } from '@nestjs/common';
import {Logger} from "@app/core/logging/logger.service";

@Injectable()
export class ApiService {
  constructor(
    private logger: Logger
  ) {
    logger.setContext(ApiService.name)
  }
  getHello(): string {
    return 'Hello World! [api]';
  }
}
