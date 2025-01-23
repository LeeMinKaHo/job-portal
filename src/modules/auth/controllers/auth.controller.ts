import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { user_service } from 'src/modules/user/services/user.service';
import { authService } from '../services/auth.service';
import { signInDTO } from '../dto/sign_in.dto';

@Controller('auth')
export class authController {
  constructor(
    private auth_service : authService
  ) {
  }
  @Post()
  @HttpCode(200)
   async signIn(@Body() sign_in_dto:signInDTO ) : Promise<{access_token: string,message:string}> {
    return await this.auth_service.signIn(  sign_in_dto)
  }
}
