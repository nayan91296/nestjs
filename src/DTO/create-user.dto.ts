import {
  IsString,
  IsInt,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";
export class createUserDTO{
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;

    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    age:number;
}