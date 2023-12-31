import { IsNotEmpty, IsString, IsNumber, MaxLength, IsOptional } from 'class-validator';

export class ProductDto {
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

}
