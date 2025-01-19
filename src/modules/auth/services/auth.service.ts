import { Body, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { user_service } from "src/modules/user/services/user.service";
import { signInDTO } from "../dto/sign_in.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class authService {
    constructor(
        private readonly usersService: user_service,
        private jwtService: JwtService
      ) {}
    async signIn(  sign_in_dto : signInDTO ) : Promise<{access_token: string}>{
        const user = await this.usersService.find_one_by_mail(sign_in_dto.gmail)
        // chưa hash passwrod
        const isMatch = await bcrypt.compare(sign_in_dto.password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.gmail  };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
}