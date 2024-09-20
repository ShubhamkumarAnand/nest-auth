import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly bcryptService = new BcryptService();

  async findUserByName(
    username: string,
  ): Promise<Prisma.UserCreateInput | undefined> {
    return this.databaseService.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findUserByEmail(
    email: string,
  ): Promise<Prisma.UserCreateInput | undefined> {
    const user = await this.databaseService.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException("User Doesn't Exist");
    return user;
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: await this.bcryptService.hash(createUserDto.password),
      },
    });
  }

  async findAll(role?: 'ADMIN' | 'REGULAR') {
    if (role) {
      const roleArray = await this.databaseService.user.findMany({
        where: {
          role,
        },
      });
      if (!roleArray) throw new NotFoundException('No Role exists');
      return roleArray;
    }
    return await this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    const user = this.findOne(id);
    if (!user) throw new NotFoundException('User Not Found');
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  remove(id: number) {
    const user = this.findOne(id);
    if (!user) throw new NotFoundException('User Not Found');
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
