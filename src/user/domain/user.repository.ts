import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/user/application/dtos/update-user.dto';

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, user: Partial<UpdateUserDto>): Promise<void>;
}
