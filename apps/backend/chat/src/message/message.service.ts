import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.interface';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>
  ) {}

  async getAllMessagesInChatRoom(roomId: any): Promise<Message[]> {
    const messages = await this.messageModel.find({ room_ref: roomId }).exec();
    return messages;
  }
  async get(messageId: string): Promise<Message> {
    const message = await this.messageModel.findById(messageId).exec();
    return message;
  }
  async addMessage(createMessage: CreateMessageDto): Promise<Message> {
    const newMessage = await new this.messageModel(createMessage);
    return newMessage.save();
  }
  async updateMessage(
    messageId: string,
    message: CreateMessageDto
  ): Promise<Message> {
    const updatedMessage = await this.messageModel.findByIdAndUpdate(
      messageId,
      message,
      { new: true }
    );
    return updatedMessage;
  }
  async deleteMessageInChat(messageId: string): Promise<Message> {
    const message = {
      message: 'Gelöscht'
    };
    const updatedMessage = await this.messageModel.findByIdAndUpdate(
      messageId,
      message,
      { new: true }
    );
    return updatedMessage;
  }
  async deleteMessage(messageId: string): Promise<any> {
    const deletedMessage = await this.messageModel.findByIdAndDelete(messageId);
    return deletedMessage;
  }
}
