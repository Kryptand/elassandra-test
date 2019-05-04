import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room.interface';
import { CreateRoomDto } from './create-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async getAllRoomsForUser(userId: any): Promise<Room[]> {
    const rooms = await this.roomModel.find({ 'users._id': userId }).exec();
    return rooms;
  }
  async get(roomId: string): Promise<Room> {
    const room = await this.roomModel.findById(roomId).exec();
    return room;
  }
  async addRoom(createRoom: CreateRoomDto): Promise<Room> {
    const newRoom = await new this.roomModel(createRoom);
    return newRoom.save();
  }
  async updateRoom(roomId: string, room: CreateRoomDto): Promise<Room> {
    const updatedRoom = await this.roomModel.findByIdAndUpdate(roomId, room, {
      new: true
    });
    return updatedRoom;
  }
  async deleteRoom(roomId: string): Promise<any> {
    const deletedRoom = await this.roomModel.findByIdAndDelete(roomId);
    return deletedRoom;
  }
}
