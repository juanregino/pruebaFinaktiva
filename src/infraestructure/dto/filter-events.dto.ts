import { IsIn, IsOptional } from "class-validator";
export class FilterEventsDto {
  @IsOptional()
  type?: string;
  since?: Date;
  until?: Date;
}