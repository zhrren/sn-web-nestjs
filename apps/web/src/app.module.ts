import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
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
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   entities: [],
    //   synchronize: true,
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
