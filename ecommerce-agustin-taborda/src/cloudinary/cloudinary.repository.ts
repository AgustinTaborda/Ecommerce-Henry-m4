import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toSteam from 'buffer-to-stream';


@Injectable()
export class CloudinaryRepository{
    
    async uploadImage(file: Express.Multer.File) : Promise<UploadApiResponse> {
        return new Promise ((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                {resource_type: "auto"},
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            toSteam(file.buffer).pipe(upload)
        });
    }
    
    async deleteImage(publicId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            
            v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error('Error deleting image:', error);
                    reject(error);
                } else {
                    console.log(`Image ${publicId} deleted successfully:`, result);
                    resolve(result);
                }
            });
        });
    }

}