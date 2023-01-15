import User from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { v4 } from "uuid";
import { Context } from "../types";
import {
  COOKIE_NAME,
  BASE_URL,
  FORGET_PASSWORD_PREFIX,
} from "../utils/constants";
import { sendEmail, validation, unique } from "../utils";
import { MeQuery } from "./components";
import RegisterMutation from "./components/RegisterMutation";
import LoginMutation from "./components/LoginMutation";
import LogoutMutation from "./components/LogoutMutation";
import ForgotPasswordMutation from "./components/ForgotPasswordMutation";
import UpdatePasswordMutation from "./components/UpdatePasswordMutation copy";
import ChangePasswordMutation from "./components/ChangePasswordMutation";

@InputType()
export class UpdatePasswordInput {
  @Field()
  newPassword!: string;

  @Field()
  confirmPassword!: string;
}

@InputType()
export class ForgotPasswordInput {
  @Field()
  newPassword!: string;

  @Field()
  token!: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field({ nullable: true })
  field?: string;

  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class UsernamePasswordInput {
  @Field({ nullable: true })
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  confirmPassword: string;
}

@Resolver(User)
class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    return MeQuery(ctx);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    return RegisterMutation(options, ctx);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    return LoginMutation(options, ctx);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() ctx: Context) {
    return LogoutMutation(ctx);
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return ForgotPasswordMutation(email, ctx);
  }

  @Mutation(() => UserResponse)
  async updatePassword(
    @Arg("options") options: UpdatePasswordInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse | boolean> {
    return UpdatePasswordMutation(options, ctx);
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("options") options: ForgotPasswordInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    return ChangePasswordMutation(options, ctx);
  }
}

export default UserResolver;
