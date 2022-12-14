import { IsEmail, Min } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Post from "./Post";

@ObjectType()
@Entity("user")
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Min(4)
  @Column({ type: "text", unique: true })
  username!: string;

  @Field()
  @IsEmail()
  @Column({ type: "text", unique: true })
  email!: string;

  @Min(4)
  @Column({ type: "text" })
  password!: string;

  @Field(() => [Post], {nullable: true})
  @OneToMany(() => Post, post=> post.user)
  posts?: Post[]
}

export default User;
