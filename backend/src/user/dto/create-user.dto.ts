export class CreateUserDto {
  fullName: string;
  password: string;
  email: string;
  role?: string;
  city?: string;
  dealershipName?: string;
}