import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { Session } from '@nestjs/common/decorators/http';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer, SessionClaimValidator } from 'supertokens-node/recipe/session';
import {EmailVerificationClaim} from 'supertokens-node/recipe/emailverification'

import { AppService } from 'src/app.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async userLogin(){
    return 'please loging to enter'
  }


  @Get('info')
  @UseGuards(new AuthGuard())
  async getUser(@Session() session: SessionContainer): Promise<string> {
    const userId = session.getUserId();
    return userId;
  }

  @Post('example')
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        EmailVerificationClaim.validators.isVerified(),
      ],
    }),
  )
  async postExample(@Session() session: SessionContainer): Promise<boolean> {
    // All validator checks have passed and the user has a verified email address
    return true;
  }
}
