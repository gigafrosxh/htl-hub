import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import {
  HtlhubPgRepositry,
  HTLHUB_PG_POOL,
} from './core/htlhub.pg.repositry';
import { HtlhubPgUserRepositry } from './user/htlhub.pg.user.repositry';
import { USER_REPOSITORY } from './user/user.repository';
import { HtlhubPgPasswordRepositry } from './user/htlhub.pg.password.repositry';
import { PASSWORD_REPOSITORY } from './user/password.repository';
import { DbService } from './core/db.service';

export const HTLHUB_REPOSITORY = 'HTLHUB_REPOSITORY';

@Module({
  providers: [
    {
      provide: HTLHUB_PG_POOL,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Pool({
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          database: configService.get<string>('DB_NAME', 'htlhub'),
          user: configService.getOrThrow<string>('DB_USER'),
          password: configService.getOrThrow<string>('DB_PASSWORD'),
        }),
    },
    HtlhubPgRepositry,
    {
      provide: HTLHUB_REPOSITORY,
      useExisting: HtlhubPgRepositry,
    },
    HtlhubPgUserRepositry,
    {
      provide: USER_REPOSITORY,
      useExisting: HtlhubPgUserRepositry,
    },
    HtlhubPgPasswordRepositry,
    {
      provide: PASSWORD_REPOSITORY,
      useExisting: HtlhubPgPasswordRepositry,
    },
    DbService,
  ],
  exports: [HTLHUB_REPOSITORY, USER_REPOSITORY, PASSWORD_REPOSITORY],
})
export class DbModule {}