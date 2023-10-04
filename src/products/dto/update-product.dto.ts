import { IsNotEmpty, IsString, IsNumber, MaxLength, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30) 
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  id: number;
}
