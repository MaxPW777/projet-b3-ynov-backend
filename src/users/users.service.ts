import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: User[] = [
    {
      id: 1,
      username: 'john',
      email: '',
    },
    {
      id: 2,
      username: 'maria',
      email: '',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(username: string): User {
    return this.users.find((user) => user.username === username);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
