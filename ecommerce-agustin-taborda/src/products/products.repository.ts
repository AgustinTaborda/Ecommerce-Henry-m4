import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository {

    getProducts() {
        const products = [
            {
              id: 1,
              name: "Laptop",
              description: "High performance laptop",
              price: 999.99,
              stock: true,
              imgUrl: "https://example.com/laptop.jpg"
            },
            {
              id: 2,
              name: "Smartphone",
              description: "Latest model smartphone",
              price: 799.99,
              stock: true,
              imgUrl: "https://example.com/smartphone.jpg"
            },
            {
              id: 3,
              name: "Headphones",
              description: "Noise-cancelling headphones",
              price: 199.99,
              stock: true,
              imgUrl: "https://example.com/headphones.jpg"
            },
            {
              id: 4,
              name: "Smartwatch",
              description: "Water-resistant smartwatch",
              price: 299.99,
              stock: true,
              imgUrl: "https://example.com/smartwatch.jpg"
            },
            {
              id: 5,
              name: "Camera",
              description: "Digital SLR camera",
              price: 499.99,
              stock: true,
              imgUrl: "https://example.com/camera.jpg"
            },
            {
              id: 6,
              name: "Tablet",
              description: "10-inch screen tablet",
              price: 399.99,
              stock: true,
              imgUrl: "https://example.com/tablet.jpg"
            },
            {
              id: 7,
              name: "Printer",
              description: "Wireless color printer",
              price: 149.99,
              stock: true,
              imgUrl: "https://example.com/printer.jpg"
            },
            {
              id: 8,
              name: "Monitor",
              description: "27-inch 4K monitor",
              price: 349.99,
              stock: true,
              imgUrl: "https://example.com/monitor.jpg"
            },
            {
              id: 9,
              name: "Keyboard",
              description: "Mechanical keyboard",
              price: 89.99,
              stock: true,
              imgUrl: "https://example.com/keyboard.jpg"
            },
            {
              id: 10,
              name: "Mouse",
              description: "Wireless ergonomic mouse",
              price: 49.99,
              stock: true,
              imgUrl: "https://example.com/mouse.jpg"
            }
        ];
        return products      
    }
}