import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
