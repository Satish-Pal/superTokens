import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [UsersController],
  providers: [AppService]
})
export class UsersModule {}
