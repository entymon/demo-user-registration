import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  @Post()
  register(@Body() request: CreateUserRequest) {
    console.log(request, 'qwEQWE');
    return this.usersService.createUser(request);
  }
}
