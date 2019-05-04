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
import { MessageService } from './message.service';
import { CreateMessageDto } from './create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // add a Message
  @Post('/message')
  async addMessage(@Res() res, @Body() createMessageDto: CreateMessageDto) {
    const Message = await this.messageService.addMessage(createMessageDto);
    return res.status(HttpStatus.OK).json({
      message: 'Message has been created successfully',
      Message
    });
  }

  @Get('messagesByChatRoom/:chatRoomId')
  async getAllMessagesByChatRoom(
    @Res() res,
    @Param('chatRoomId') chatRoomId: string
  ) {
    const Messages = await this.messageService.getAllMessagesInChatRoom(
      chatRoomId
    );
    return res.status(HttpStatus.OK).json(Messages);
  }

  // Fetch a particular Message using ID
  @Get('message/:messageId')
  async getMessage(@Res() res, @Param('messageId') messageId) {
    const Message = await this.messageService.get(messageId);
    if (!Message) throw new NotFoundException('Message does not exist!');
    return res.status(HttpStatus.OK).json(Message);
  }
  @Put('/update')
  async updateMessage(
    @Res() res,
    @Query('messageId') messageId,
    @Body() createMessageDto: CreateMessageDto
  ) {
    const updatedMessage = await this.messageService.updateMessage(
      messageId,
      createMessageDto
    );
    if (!updatedMessage) throw new NotFoundException('Message does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Message has been successfully updated',
      updatedMessage
    });
  }
  @Put('/deleteForOtherClients')
  async deleteForOtherClients(@Res() res, @Query('messageId') messageId) {
    const updatedMessage = await this.messageService.deleteMessageInChat(
      messageId
    );
    if (!updatedMessage) throw new NotFoundException('Message does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Message has been successfully updated',
      updatedMessage
    });
  }
  @Delete('/delete')
  async deleteMessage(@Res() res, @Query('messageId') messageId) {
    const deletedMessage = await this.messageService.deleteMessage(messageId);
    if (!deletedMessage) throw new NotFoundException('Message does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      deletedMessage
    });
  }
}
