export class CreatePoolDto {
  make: string;
  model: string;
  variant: string;
  city: string;
  targetSize: number;
  expectedDiscount: string;
  expiresAt: Date;
}