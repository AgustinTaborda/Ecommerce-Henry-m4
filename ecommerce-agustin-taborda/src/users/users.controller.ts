import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import {User as UserEntity} from './entities/users.entity'
import { AuthGuard } from "src/auth/authGuard";
import { createUserDto } from "./dto/createUserDto";

@Controller('users')
export class UserController{
    constructor(
        private readonly usersService:UsersService,
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
        return this.usersService.getUsers()
    }
    
    @Get(':uuid')
    @UseGuards(AuthGuard)
    getUserById(@Param('uuid', ParseUUIDPipe) uuid:string) {        
        return this.usersService.getUserById(uuid)
    }
    
    @Put(':uuid')
    @UseGuards(AuthGuard)
    updateUser(
        @Param('uuid', ParseUUIDPipe) id:string, 
        @Body() updateDto:Omit<UserEntity, 'id'>) {
        return this.usersService.updateUser(id, updateDto)
    }

    @Delete(':uuid')
    @UseGuards(AuthGuard)
    deleteUser(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.usersService.deleteUser(uuid)
    }
}