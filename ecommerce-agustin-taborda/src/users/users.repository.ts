import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    
    getUsers() {
        const hardcodeUsers:any[] = [
            {
              id: 1,
              email: "alice@example.com",
              name: "Alice Johnson",
              password: "alice123",
              address: "123 Elm Street",
              phone: "123-456-7890",
              country: "USA",
              city: "New York"
            },
            {
              id: 2,
              email: "bob@example.com",
              name: "Bob Smith",
              password: "bob123",
              address: "456 Oak Avenue",
              phone: "987-654-3210",
              country: "Canada",
              city: "Toronto"
            },
            {
              id: 3,
              email: "carol@example.com",
              name: "Carol White",
              password: "carol123",
              address: "789 Pine Road",
              phone: "456-789-0123",
              country: "USA",
              city: "Chicago"
            },
            {
              id: 4,
              email: "dave@example.com",
              name: "Dave Brown",
              password: "dave123",
              address: "101 Maple Lane",
              phone: "321-654-0987"
            },
            {
              id: 5,
              email: "eve@example.com",
              name: "Eve Davis",
              password: "eve123",
              address: "202 Cedar Street",
              phone: "789-012-3456",
              country: "UK",
              city: "London"
            }
          ]          

        return hardcodeUsers;
    }
}