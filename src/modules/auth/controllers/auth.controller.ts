import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { authService } from '../services/auth.service';
import { signInDTO } from '../dto/sign_in.dto';
import { IToken } from '../dto/token-reponse.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { RefreshToken } from '../decorator/refreshToken.decorator';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller('auth')
export class authController {
  constructor(
    private auth_service : authService
  ) {
  }
  @Post("/signIn")
  @HttpCode(200)
   async signIn(@Body() sign_in_dto:signInDTO ) : Promise<IToken> {
    return await this.auth_service.signIn(  sign_in_dto)
  }
  @Post("/logout")
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  async logout(@Body() id: number) : Promise<boolean>{
    return this.auth_service.logout(id)
  }
  @UseGuards(RefreshTokenGuard)
  @Post("/refresh")
  refreshToken(id :number,@RefreshToken() refreshToken: string){
      this.auth_service.refreshTokens(id , refreshToken)
  }
}
