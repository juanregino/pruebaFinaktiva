import { IsDateString, IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  description: string;
  @IsIn(['API', 'Manual'])
  type: string;

  @IsOptional()
  @IsDateString()
  date: Date;
}