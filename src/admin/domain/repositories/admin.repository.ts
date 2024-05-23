import { User } from "@prisma/client"; 
import { UpdateUserDto } from "src/admin/application/dtos/update-user.dto";

export interface AdminRepository {

  create(user: Omit<User, 'id'>): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, user: UpdateUserDto): Promise<void>;

}