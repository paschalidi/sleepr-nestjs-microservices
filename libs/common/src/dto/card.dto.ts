import {IsCreditCard, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CardDto {
    @IsNotEmpty()
    @IsString()
    cvc: string;

    /**
     * Two-digit number representing the card's expiration month.
     */
    @IsNotEmpty()
    @IsNumber()
    exp_month: number;

    /**
     * Four-digit number representing the card's expiration year.
     */
    @IsNotEmpty()
    @IsNumber()
    exp_year: number;

    /**
     * The card number, as a string without any separators.
     */
    @IsNotEmpty()
    @IsCreditCard()
    number: string;

}
