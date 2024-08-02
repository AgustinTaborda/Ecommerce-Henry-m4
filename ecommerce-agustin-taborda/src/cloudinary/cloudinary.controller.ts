import { Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import { UploadImageValidationPipe } from "src/pipes/uploadImageValidator.pipe";

@Controller('files') 
export class CloudinaryController {
    constructor(private readonly cloudinaryService:CloudinaryService){}

    @Post('uploadImage/:uuid')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @UploadedFile(UploadImageValidationPipe) file: Express.Multer.File,
        @Param('uuid', ParseUUIDPipe) uuid: string
    ) {
        return await this.cloudinaryService.uploadImage(uuid, file);
    }
}