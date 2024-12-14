import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Patient {

@PrimaryGeneratedColumn('uuid')
id: string;
@Column()
nom : string;
    
@Column()  
email : string;

 @Column()   
dateDeNaiss : string

@Column()    
postNom: string

@Column()   
numero_tel: string;

@Column()   
genre: string

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

@DeleteDateColumn()
deletedDate: Date;
    
}
