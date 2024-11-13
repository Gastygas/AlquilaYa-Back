import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  providers: [ChatbotService],
  controllers: [ChatbotController],
})
export class ChatModule {}