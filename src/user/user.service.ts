import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserRequestDto } from "./dto/user-req.dto";
import * as argon2 from 'argon2';
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async register(userRequestDto: UserRequestDto): Promise<User> {
        
        const hashedPassword = await argon2.hash(userRequestDto.password);
        return this.userRepository.register(userRequestDto, hashedPassword);
    }
}