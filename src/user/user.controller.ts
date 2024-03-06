import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRequestDto } from "./dto/user-req.dto";
import { UserResponseDto } from "./dto/user-res.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('register')
    async register(@Body() userRequestDto: UserRequestDto): Promise<UserResponseDto> {
        const user = await this.userService.register(userRequestDto);
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}