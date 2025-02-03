/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RetrieveResultsDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @IsNumber()
  page: number = 1;

  @IsNumber()
  size: number = 10;
}
