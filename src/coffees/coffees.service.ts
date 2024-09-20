import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CoffeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCoffee: Prisma.CoffeeCreateInput) {
    return this.databaseService.coffee.create({
      data: createCoffee,
    });
  }

  async findAll() {
    return await this.databaseService.coffee.findMany();
  }

  async findOne(id: number) {
    const coffee = await this.databaseService.coffee.findFirst({
      where: {
        id,
      },
    });
    if (!coffee) throw new NotFoundException('Coffee Not available');
    return coffee;
  }

  update(id: number, updateCoffee: Prisma.CoffeeUpdateInput) {
    const coffee = this.findOne(id);
    if (!coffee) throw new NotFoundException('Coffee Not available');

    return this.databaseService.coffee.update({
      where: {
        id,
      },
      data: updateCoffee,
    });
  }

  async remove(id: number) {
    const coffee = this.findOne(id);
    if (!coffee) throw new NotFoundException('Coffee Not available');
    return await this.databaseService.coffee.delete({
      where: {
        id,
      },
    });
  }
}
