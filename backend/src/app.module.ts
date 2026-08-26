import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { DbModule } from './db/db.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    DbModule,
    HealthModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
