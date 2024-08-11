import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import {User as UserEntity} from './entities/users.entity'
import { AuthGuard } from "../auth/authGuard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../auth/roles.enum";
import { RolesGuard } from "../auth/roles.guard";

@Controller('users')
export class UserController{
    constructor(
        private readonly usersService:UsersService,
    ) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseGuards(AuthGuard)
    async getUsers() {
        return this.usersService.getUsers()
    }
    
    @Get(':uuid')
    @UseGuards(AuthGuard)
    async getUserById(@Param('uuid', ParseUUIDPipe) uuid:string) {        
        const response = await this.usersService.getUserById(uuid);
        
        if (!response) {
            throw new NotFoundException('User not found')
        };
        return response;
    }
    
    @Put(':uuid')
    @UseGuards(AuthGuard)
    async updateUser(
        @Param('uuid', ParseUUIDPipe) id:string, 
        @Body() updateDto:Omit<UserEntity, 'id'>) {
        return this.usersService.updateUser(id, updateDto)
    }

    @Delete(':uuid')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.usersService.deleteUser(uuid)
    }
}