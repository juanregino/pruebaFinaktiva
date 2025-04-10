import { IsDateString, IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  description: string;
  @IsIn(['API', 'MANUAL'])
  type: string;

  @IsOptional()
  @IsDateString()
  date: Date;
}