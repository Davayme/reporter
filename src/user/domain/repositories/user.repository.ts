import { User } from "@prisma/client"; 

export interface UserRepository {
  create(user: Omit<User, 'id'>): Promise<User>;
}