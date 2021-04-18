import {Controller, Get, Render, Req} from '@nestjs/common';
import {AppService} from './app.service';
import {FastifyRequest} from "fastify";
import {ConfigService} from "@nestjs/config";
import {settings} from "./config/settings";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('index')
  @Render('index.hbs')
  index(@Req() request: FastifyRequest) {
    const visits = request.session.get('visits');
    request.session.set('visits', visits ? visits + 1 : 1);
    return {message: 'Hello world!', visits: visits, config: this.configService.get("port")};
  }
}
