import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import Like from "./Like";
import User from "./User";

@ObjectType()
@Entity("post")
class Post extends BaseEntity {
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
  @Column({ type: "text" })
  body: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.post)
  @JoinColumn()
  likes?: Like[];
}

export default Post;
