import { Injectable } from "@nestjs/common";
import { User } from "./users.interface";

const hardcodeUsers:User[] = [
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

@Injectable()
export class UsersRepository {
  getAllUsers() {
    return hardcodeUsers;
  }

  getUsers() {
    const usersWithoutPassword = hardcodeUsers.map(({password, ...users}) => users)
    return usersWithoutPassword;
  }
  
  getUserById(id: string) {
    const user:User = hardcodeUsers.find(user => user.id === Number(id));   
    if (!user) {
      return 'No se encontro el usuario'
    };
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword;
  }
  
  createUser(createDto: Omit<User, "id">) {
    const id = hardcodeUsers.length +1;
    const newUser = {id, ...createDto};
    hardcodeUsers.push(newUser);
    const {password, ...user} = newUser;
    return user
  }
  
  updateUser(id: string, updateDto:Omit<User, 'id'>) {
    const updatedUser = {id: Number(id), ...updateDto};
    const userIndex = hardcodeUsers.findIndex(user => user.id === Number(id));
    if (userIndex === -1) {
      return 'Invalid id'
    }
    hardcodeUsers[userIndex] = updatedUser;
    return Number(id);
  }
  
  deleteUser(id: string) {
    const userIndex = hardcodeUsers.findIndex(user => user.id === Number(id));
    if (userIndex === -1) {
      return 'Invalid id'
    }
    const response = hardcodeUsers.splice(userIndex,1)
    return Number(id)
  }
}