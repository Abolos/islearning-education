import { Controller, Req, Post, Body, Get, Param, Delete, Patch, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { CreateUserUseCase } from "./use-cases/create-user.usecase"
import { UpdateUserUseCase } from "./use-cases/update-user.usecase"
import { DeleteUserUseCase } from "./use-cases/delete.usecase"
import { FindUserByIdUseCase } from "./use-cases/find-user-by-id.usecase"
import { FindAllUsersUseCase } from "./use-cases/find-all-user.usecase"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

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

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req: any) {
        return await this.findAllUsersUseCase.execute(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Req() req: any, @Param('id') id: string) {
        return await this.findUserByIdUseCase.execute(req.user, Number(id))
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUser(@Req() req: any, @Param('id') id: string, @Body() data: UpdateUserDto) {
        return await this.updateUserUseCase.execute(req.user, Number(id), data)
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.deleteUserUseCase.execute(Number(id))
    }
}