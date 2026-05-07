import { Controller, Post, Body, Get, Param, Delete, Patch } from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { CreateUserUseCase } from "./use-cases/create-user.usecase"
import { UpdateUserUseCase } from "./use-cases/update-user.usecase"
import { DeleteUserUseCase } from "./use-cases/delete.usecase"
import { FindUserByIdUseCase } from "./use-cases/find-user-by-id.usecase"
import { FindAllUsersUseCase } from "./use-cases/find-all-user.usecase"

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
    ) {}
    @Post()
    async createUser(@Body() data: CreateUserDto) {
        return await this.createUserUseCase.execute(data)
    }
    @Get()
    async findAll() {
        return await this.findAllUsersUseCase.execute()
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.findUserByIdUseCase.execute(Number(id))
    }
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return await this.updateUserUseCase.execute(Number(id), data)
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.deleteUserUseCase.execute(Number(id))
    }
}