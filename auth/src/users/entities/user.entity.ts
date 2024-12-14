import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateRoleUserEnum } from "../enums/create-role-user.enum";

@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({nullable:true})
nom_user: string;

@Column()
password: string;

@Column({unique:true})
email:string;

@Column({type: 'enum', enum: CreateRoleUserEnum, default: CreateRoleUserEnum.user})
role:string;

@Column({nullable:true})
numero_tel:string;

@Column({nullable:true})
patientId:string

@Column()
salt:string;

@Column({ nullable: true })
refresh_token?: string;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

@DeleteDateColumn()
deletedDate: Date;
}


