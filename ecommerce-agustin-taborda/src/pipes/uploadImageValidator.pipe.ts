import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UploadImageValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const maxSize = 204800;
        const validMimetypes = [
            "image/jpeg",
            "image/jpg",
            "image/gif",
            "image/webp",
            "image/png"
        ]

        if (!value || !value.size || !value.mimetype) {
            throw new BadRequestException("El archivo no es válido");
        }

        if (value.size > maxSize) {
            throw new BadRequestException("El tamaño del archivo excede el máximo permitido de 200 KB");
        }

        if (!validMimetypes.includes(value.mimetype)) {
            throw new BadRequestException(`Formato de imagen incorrecto. Los formatos permitidos son: ${validMimetypes.join(', ')}`);
        }

        return value;
    }
}