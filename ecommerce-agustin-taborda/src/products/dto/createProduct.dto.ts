export interface createProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl?: string;
    category_id: string;
}