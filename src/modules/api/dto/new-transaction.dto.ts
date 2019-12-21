import { IsString, IsNumber } from 'class-validator';

export class NewTransaction {
  @IsString()
  sender: string;

  @IsString()
  recipient: string;

  @IsNumber()
  amount: number;
}
