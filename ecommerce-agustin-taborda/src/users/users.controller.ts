import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.interface";
import { AuthGuard } from "src/auth/authGuard";

@Controller('users')
export class UserController{
    constructor(private readonly usersService:UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
        return this.usersService.getUsers()
    }
    
    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id') id:string) {        
        return this.usersService.getUserById(id)
    }
    
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createUser(@Body() createDto:Omit<User, 'id'>) {
        return this.usersService.createUser(createDto);
    }
    
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id:string, @Body() updateDto:Omit<User, 'id'>) {
        return this.usersService.updateUser(id, updateDto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id:string) {
        return this.usersService.deleteUser(id)
    }
}