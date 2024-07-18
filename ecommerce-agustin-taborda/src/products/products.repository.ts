import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";
import { findIndex } from "rxjs";

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

@Injectable()
export class ProductsRepository {
  
  getProducts( page: number = 1, limit: number = 5) {    
    const startIndex:number = (page - 1) * limit;
    const endIndex:number = page * limit;
    return products.slice(startIndex, endIndex);
  }
  
  getProductById(id: number) {
    const product = products.find(product => product.id === id);
    if (!product) {
      return 'Invalid id'
    }
    return product;
  }
  
  createProduct(createDto: Omit<Product, "id">) {
    const id:number = products.length + 1;
    const newProduct:Product = {id, ...createDto};
    products.push(newProduct);
    return id;
  }
  
  updateProduct(id: number, updateProductDto: Omit<Product, "id">) {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return "Product not found"; 
    };
    products[productIndex] = {id, ...updateProductDto};
    return id;
  }
  
  deleteProduct(id: number) {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return "Product not found"; 
    };
    products.splice(productIndex,1);
    return id;
  }
}