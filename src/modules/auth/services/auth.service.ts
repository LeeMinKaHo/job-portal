import { Body, ForbiddenException, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { signInDTO } from '../dto/sign_in.dto';
import * as bcrypt from 'bcrypt';
import { IToken } from '../dto/token-reponse.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { RefreshToken } from '../decorator/refreshToken.decorator';
@Injectable()
export class authService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    sign_in_dto: signInDTO,
  ): Promise<IToken> {
    const user = await this.usersService.findOneByMail(sign_in_dto.gmail);
    if (user == null) {
      return {
        accessToken: null,
        refreshToken:null
      };
    }
    const isMatch = await bcrypt.compare(sign_in_dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    // access Token
    const payload = { id: user.id, username: user.gmail };
    const accessToken = await this.jwtService.signAsync(payload,{
      secret:process.env.ACCESS_SECRET_KEY,
      expiresIn:"15m"
    })
    const refreshToken = await this.jwtService.signAsync(payload,{
      secret : process.env.REFESH_SECRET_KEY,
      expiresIn : "1d"
    })

    // Lưu refreshToken  
    this.usersService.updateToken(user.id ,{refresh_token:refreshToken})
    return {
      accessToken,
      refreshToken
    };
  }

  async logout(id:number) :Promise<boolean> {
    try{
      const user = await this.usersService.updateToken(id , {refresh_token:null})
    
      if(user.refresh_token == null){
        return true
      }
      else return false
    }
    catch(e){
      throw new Error("Failed to logout user: " + e.message);
    }
  }
  
  async refreshTokens(@Body() userId: number, @RefreshToken() refreshToken: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
   
  
    if(refreshToken == user.refresh_token){
     // access Token
     const payload = { sub: user.id, username: user.gmail };
     const accessToken = await this.jwtService.signAsync(payload,{
       secret:process.env.ACCESS_SECRET_KEY,
       expiresIn:"15m"
     })
     const  newRefreshToken = await this.jwtService.signAsync(payload,{
       secret : process.env.REFESH_SECRET_KEY,
       expiresIn : "1d"
     })
 
     // Lưu refreshToken  
     this.usersService.updateToken(user.id ,{refresh_token:refreshToken})
    }
    else throw new ForbiddenException('Access Denied');
  }
}
