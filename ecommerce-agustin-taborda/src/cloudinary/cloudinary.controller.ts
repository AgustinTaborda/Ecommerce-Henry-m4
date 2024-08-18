import { Controller, Delete, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import { UploadImageValidationPipe } from "../pipes/uploadImageValidator.pipe";
import { AuthGuard } from "../auth/authGuard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

@ApiTags('Cloudinary')
@ApiBearerAuth()
@Controller('files') 
export class CloudinaryController {
    constructor(private readonly cloudinaryService:CloudinaryService){}

    @Post('uploadImage/:productId')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data') 
    @ApiBody({
        description: 'Imagen a subir',
        required: true,
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadImage(
        @UploadedFile(UploadImageValidationPipe) file: Express.Multer.File,
        @Param('productId', ParseUUIDPipe) productId: string
    ) {
        return await this.cloudinaryService.uploadImage(productId, file);
    }


    @Put('updateImage/:productId')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Imagen a actualizar',
        required: true,
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async updateImage(
        @UploadedFile(UploadImageValidationPipe) file: Express.Multer.File,
        @Param('productId', ParseUUIDPipe) productId: string
    ) {
        return await this.cloudinaryService.uploadImage(productId, file);
    }

    @Delete('deleteImage/:productId')
    async deleteImage(
        @Param('productId', ParseUUIDPipe) productId: string
    ) {
        return await this.cloudinaryService.deleteImage(productId);
    }
}