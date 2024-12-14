import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator"
import { CreateRoleUserEnum } from "../enums/create-role-user.enum";

export class CreateUserDto {
    
    @IsOptional()
    @IsString()
    nom_user:string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(CreateRoleUserEnum)
    role:string;

    @IsOptional()
    @IsPhoneNumber()
    numero_tel: string;

    @IsOptional()
    @IsUUID()
    patientId:string

    @IsOptional()
    @IsString()
    salt: string

    @IsOptional()
    refeshToken:string;    
}
