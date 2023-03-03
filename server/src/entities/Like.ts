import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Post from "./Post";
import User from "./User";

@ObjectType()
@Entity("like")
class Like extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ default: 0 })
  value: number;

  @Field(() => Post, { nullable: true })
  @OneToOne(() => Post, (post) => post.likes, { eager: true })
  @JoinColumn()
  post: Post;

  @Field(() => Int)
  @Column()
  postId: number;

  // @Field(() => User)
  // @ManyToOne(() => User)
  // user: User;
}

export default Like;
