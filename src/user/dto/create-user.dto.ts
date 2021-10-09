import { UserRole } from '../model/user.model';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
