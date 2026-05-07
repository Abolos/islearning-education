import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(id: number, data: UpdateUserDto) {
        const updateDate: any = {
            email: data.email,
            role: data.role,
            status: data.status
        }
        if(data.passwordHash) updateDate.passwordHash = data.passwordHash;
        const user = await this.userRepository.updateUser(id, updateDate);
        return UserMapper.toResponse(user);
    }
}