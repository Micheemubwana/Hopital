import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreatePatientDto {

    @IsNotEmpty()
    @IsString()
    nom : string;
    
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsOptional()
    dateDeNaiss : string

    @IsOptional()
    @IsString()
    postNom: string

    @IsOptional()
    @IsPhoneNumber()
    numero_tel: string;

    @IsOptional()
    @IsString()
    genre: string

}
