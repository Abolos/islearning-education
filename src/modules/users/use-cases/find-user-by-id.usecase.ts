import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { Role, Status } from "@prisma/client";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "src/modules/auth/constants/auth.errors";

@Injectable()
export class FindUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}
    async execute(
        currentUser: {
            id: number,
            email: string,
            role: Role,
            status: Status,
        }, targetUserId: number) {
        const isAdmin = currentUser.role === Role.ADMIN;
        const isOwner = currentUser.id === targetUserId;
        if (!isAdmin && !isOwner) {
            throw new AppException(AuthError.FORBIDDEN);
        }

        const user = await this.userRepository.findOne(targetUserId);
        return UserMapper.toResponse(user);
    }
}