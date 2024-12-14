import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
nom_user: string;
@Column({unique:true})
password:string;

@Column({unique:true})
email:string;

@Column()
role:string;

@Column()
numero_tel:string;

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


