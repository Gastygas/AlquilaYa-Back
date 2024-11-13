import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

  @Controller('chatbot')
  export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}
  
    @Post('response')
    getResponse(@Body('option') option: string) {
      return this.chatbotService.getResponse(option);
    }
  }