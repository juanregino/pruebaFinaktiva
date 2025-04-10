import { IsIn, IsOptional } from "class-validator";
export class FilterEventsDto {
  @IsOptional()
  @IsIn(['API', 'Manual'])
  type?: string;
  since?: Date;
  until?: Date;
}