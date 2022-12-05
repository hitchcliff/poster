import User from "../entities/User";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { unique, validation } from "../utils/validation";

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

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  confirmPassword: string;
}

@Resolver(User)
class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput
  ): Promise<UserResponse> {
    // validation
    const errors = validation(options);
    if (errors.length) {
      return {
        errors,
      };
    }

    // Has Password
    const hashedPassword = await argon2.hash(options.password);
    const user = new User();

    try {
      user.username = options.username;
      user.password = hashedPassword;

      await user.save();

      return {
        user,
      };
    } catch (error) {
      const usernameError = unique(error.code, error.detail);

      if (usernameError.length) {
        return {
          errors: usernameError,
        };
      }
    }

    return {
      user,
    };
  }
}

export default UserResolver;
