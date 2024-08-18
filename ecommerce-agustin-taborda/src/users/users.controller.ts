import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import {User as UserEntity} from './entities/users.entity'
import { AuthGuard } from "../auth/authGuard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../auth/roles.enum";
import { RolesGuard } from "../auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { createUserDto } from "./dto/createUserDto";

@ApiTags('Users')
@Controller('users')
export class UserController{
    constructor(
        private readonly usersService:UsersService,
    ) {}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getUsers() {
        return this.usersService.getUsers()
    }
    
    @ApiBearerAuth()
    @Get(':uuid')
    @UseGuards(AuthGuard)
    async getUserById(@Param('uuid', ParseUUIDPipe) uuid:string) {        
        const response = await this.usersService.getUserById(uuid);
        
        if (!response) {
            throw new NotFoundException('User not found')
        };
        return response;
    }
    
    @ApiBearerAuth()
    @ApiBody({
        description: 'Ingresar la información actualizada del usuario',
        type: createUserDto})
    @Put(':uuid')
    @UseGuards(AuthGuard)
    async updateUser(
        @Param('uuid', ParseUUIDPipe) id:string, 
        @Body() updateDto: createUserDto) { 
        const savedUser = await this.usersService.updateUser(id, updateDto);
        const { password, ...userWithoutPasswordResponse } = savedUser;
        return userWithoutPasswordResponse;
    }
    
    @ApiBearerAuth()
    @ApiBody({
        description: 'Ingresar la información actualizada del usuario',
        type: createUserDto})
    @Post()
    @UseGuards(AuthGuard)
    async createUser(
        @Body() updateDto: createUserDto) { 
        const savedUser = await this.usersService.createUser(updateDto);
        console.log(savedUser);
        
        const { password, ...userWithoutPasswordResponse } = savedUser;
        return userWithoutPasswordResponse;
    }

    @ApiBearerAuth()
    @Delete(':uuid')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('uuid', ParseUUIDPipe) uuid:string):Promise<string> {
        return await this.usersService.deleteUser(uuid)
    }
}