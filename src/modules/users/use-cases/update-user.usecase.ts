import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserMapper } from "../mappers/user.mapper";
import { Role, Status } from "@prisma/client";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "src/modules/auth/constants/auth.errors";
import { UserError } from "../constants/user.error";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(
        currentUser: {
            id: number,
            email: string,
            role: Role,
            status: Status,
        },
        targetUserId: number, data: UpdateUserDto) {
        const isAdmin = currentUser.role === Role.ADMIN;
        const isOwner = currentUser.id === targetUserId;
        if (!isAdmin && !isOwner) {
            throw new AppException(AuthError.FORBIDDEN);
        }

        const updateData: any = {};
        if (data.email !== undefined) {
            updateData.email = data.email;
        }
        if (data.passwordHash !== undefined) {
            updateData.passwordHash = data.passwordHash;
        }

        if (isAdmin) {
            if (data.role !== undefined) {
                updateData.role = data.role;
            }
            if (data.status !== undefined) {
                updateData.status = data.status;
            }
        }
        const user = await this.userRepository.updateUser(targetUserId, updateData);
        if (!user) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        return UserMapper.toResponse(user);
    }
}