import { IsEmail, Min } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Like from "./Like";
import Photo from "./Photo";
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

  @Field({ defaultValue: false })
  @Column({ default: false })
  verified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

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

  @Field(() => Photo)
  @OneToOne(() => Photo, (photo) => photo.user, { eager: true })
  photo?: Photo;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @Field(() => [Like], { nullable: true })
  @ManyToMany(() => Like, (like) => like.users)
  likes?: Like[];
}

export default User;
