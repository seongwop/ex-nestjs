import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { UserRequestDto } from "./dto/user-req.dto";


@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        @InjectEntityManager()
        private readonly entitymanager: EntityManager,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.repository.findOneBy({email});
    }

    async register(userRequestDto: UserRequestDto, hashedPassword: string): Promise<User> {
        const user = new User();
        user.name = userRequestDto.name;
        user.email = userRequestDto.email;
        user.password = hashedPassword;
        return this.repository.save(user);
    }

}