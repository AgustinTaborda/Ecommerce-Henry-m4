import { Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import { UploadImageValidationPipe } from "../pipes/uploadImageValidator.pipe";
import { AuthGuard } from "../auth/authGuard";

@Controller('files') 
export class CloudinaryController {
    constructor(private readonly cloudinaryService:CloudinaryService){}

    @Post('uploadImage/:productId')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @UploadedFile(UploadImageValidationPipe) file: Express.Multer.File,
        @Param('productId', ParseUUIDPipe) productId: string
    ) {
        return await this.cloudinaryService.uploadImage(productId, file);
    }
}