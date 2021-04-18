import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import {Logger} from "@app/core/logging/logger.service";

@Module({
  providers: [
    Logger,
    CoreService
  ],
  exports: [
    Logger,
    CoreService
  ],
})
export class CoreModule {}
