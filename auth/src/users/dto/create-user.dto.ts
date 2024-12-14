import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    
    @IsOptional()
    nom_user:string;
    
    @IsString()
    email : string;

    @IsNotEmpty()
    mot_de_passs : string;

    @IsOptional()
    role:string;

    @IsOptional()
    numero_tel: string;

    @IsNotEmpty()
    solt: string;

    @IsOptional()
    refeshToken:string;    
}
