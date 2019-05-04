import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from '../message/message.module';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/chatapp', {
      useNewUrlParser: true
    }),
    MessageModule,
    UserModule,
    RoomModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
