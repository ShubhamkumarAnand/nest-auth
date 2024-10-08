import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { IamModule } from 'src/iam/iam.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, IamModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
