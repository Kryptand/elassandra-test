import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // add a User
  @Post('/user')
  async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const User = await this.userService.addUser(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      User
    });
  }

  // Fetch a particular User using ID
  @Get('user/:userId')
  async getUser(@Res() res, @Param('userId') userId) {
    const User = await this.userService.get(userId);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(User);
  }
  @Put('/update')
  async updateUser(
    @Res() res,
    @Query('userId') userId,
    @Body() createUserDto: CreateUserDto
  ) {
    const updatedUser = await this.userService.updateUser(
      userId,
      createUserDto
    );
    if (!updatedUser) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      updatedUser
    });
  }

  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userId') userId) {
    const deletedUser = await this.userService.deleteUser(userId);
    if (!deletedUser) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      deletedUser
    });
  }
}
