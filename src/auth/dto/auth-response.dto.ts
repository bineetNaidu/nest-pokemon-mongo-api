import { CreateUserDto } from '../../user/dto/create-user.dto';

export class AuthResponseDto {
  readonly accessToken: string;
  readonly user: CreateUserDto;
}
