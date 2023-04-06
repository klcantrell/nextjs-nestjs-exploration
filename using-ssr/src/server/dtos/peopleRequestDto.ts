import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PeopleRequestDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsInt()
  page: number;
}
