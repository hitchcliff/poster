import isAuth from "../middleware/isAuth";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import User from "../entities/User";
import { Context } from "../types";
import {
  ChangePasswordMutation,
  ForgotPasswordMutation,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
  UpdatePasswordMutation,
  UpdateUserProfileMutation,
} from "./components/mutation";
import { MeQuery } from "./components/query";

@InputType()
export class UserProfileInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@InputType()
export class PasswordInput {
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
  @UseMiddleware(isAuth)
  @Mutation(() => UserResponse, { nullable: true })
  async updateUserProfile(
    @Arg("options") options: UserProfileInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    return UpdateUserProfileMutation(options, ctx);
  }

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

  @UseMiddleware(isAuth)
  @Mutation(() => UserResponse)
  async updatePassword(
    @Arg("options") options: PasswordInput,
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
