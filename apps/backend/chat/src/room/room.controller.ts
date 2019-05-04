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
import { CreateRoomDto } from './create-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  // add a Room
  @Post('/room')
  async addRoom(@Res() res, @Body() createRoomDto: CreateRoomDto) {
    const Room = await this.roomService.addRoom(createRoomDto);
    return res.status(HttpStatus.OK).json({
      message: 'Room has been created successfully',
      Room
    });
  }

  @Get('room/:userId')
  async getRoomsByUserId(@Res() res, @Param('userId') userId: string) {
    const Rooms = await this.roomService.getAllRoomsForUser(userId);
    return res.status(HttpStatus.OK).json(Rooms);
  }

  // Fetch a particular Room using ID
  @Get('room/:roomId')
  async getRoom(@Res() res, @Param('roomId') roomId) {
    const Room = await this.roomService.get(roomId);
    if (!Room) throw new NotFoundException('Room does not exist!');
    return res.status(HttpStatus.OK).json(Room);
  }
  @Put('/update')
  async updateRoom(
    @Res() res,
    @Query('roomId') roomId,
    @Body() createRoomDto: CreateRoomDto
  ) {
    const updatedRoom = await this.roomService.updateRoom(
      roomId,
      createRoomDto
    );
    if (!updatedRoom) throw new NotFoundException('Room does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Room has been successfully updated',
      updatedRoom
    });
  }

  @Delete('/delete')
  async deleteRoom(@Res() res, @Query('roomId') roomId) {
    const deletedRoom = await this.roomService.deleteRoom(roomId);
    if (!deletedRoom) throw new NotFoundException('Room does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      deletedRoom
    });
  }
}
