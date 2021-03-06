import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
class User {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ select: false, nullable: true, insert: false, update: false })
    password: string;

    @Column()
    password_hash: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    async beforeInsert() {
        if(this.password){
            this.password_hash = await bcrypt.hash(this.password, 8);
        }
    }

    async checkPassword(password: string){
        return await bcrypt.compare(password, this.password_hash);
    }

    generateToken(){
        return jwt.sign({ id: this.id }, process.env.APP_SECRET)
    }
}

export { User };