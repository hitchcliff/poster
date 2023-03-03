import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Post from "./Post";

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
  @ManyToOne(() => Post, (post) => post.likes, { eager: true })
  post: Post;

  @Field(() => Int)
  @Column()
  postId: number;
}

export default Like;
