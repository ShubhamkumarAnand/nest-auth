import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [CoffeesModule, UsersModule, DatabaseModule, IamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
