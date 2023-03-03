import { IsEmail, Min } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @Column({ nullable: true, default: 1 })
  photoId?: number;

  @Field(() => Photo, { nullable: true })
  @OneToOne(() => Photo, (photo) => photo.user, { eager: true })
  @JoinColumn()
  photo?: Photo;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @Field(() => Like, { nullable: true })
  @ManyToOne(() => Like, (like) => like.users)
  like?: Like;
}

export default User;
