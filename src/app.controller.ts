import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session/session.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  @UseGuards(new AuthGuard())
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return "magic";
  }
}
