import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'auth',
      entities: [__dirname + '/../**/*.entity{.ts, .js}'],
      synchronize: true,
      type: 'mongodb'
    }),
    AuthModule
  ]
})
export class AppModule {}
