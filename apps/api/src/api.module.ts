import {Module} from '@nestjs/common';
import {ApiController} from './api.controller';
import {ApiService} from './api.service';
import {ConfigModule} from "@nestjs/config";
import {loadSettings} from "@app/core/config/settings";
import {CoreModule} from "@app/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadSettings],
    }),
    CoreModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {
}
