import {  IsNotEmpty } from "class-validator";

export class CreateConcertDto {
    @IsNotEmpty()
    name: string;
    des: string;
    amount: string;
    user_reserve: string[];
}
