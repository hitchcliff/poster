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
import { unique, validation } from "../utils/validation";
import { Context } from "../types";

@InputType()
class LoginInput {
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

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  confirmPassword: string;
}

@Resolver(User)
class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    if (!req.session.userId) return null;

    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: Context
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

    // Store userId in Redis
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: {
        username: options.username,
      },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesn't exists",
          },
        ],
      };
    }

    const verified = await argon2.verify(user.password, options.password);

    if (!verified) {
      return {
        errors: [
          {
            field: "password",
            message: "wrong password",
          },
        ],
      };
    }

    // Store cookies in Redis
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) => {
      req.session.destroy((err: any) => {
        res.clearCookie("kevinId");
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }
}

export default UserResolver;
