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

@InputType()
class ForgotPasswordInput {
  @Field()
  newPassword!: string;

  @Field()
  token!: string;
}

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

    const emailIsTaken = await User.findOne({
      where: {
        email: options.email,
      },
    });

    if (emailIsTaken) {
      return {
        errors: [
          {
            field: "email",
            message: "email already exists",
          },
        ],
      };
    }

    // Hash Password
    const hashedPassword = await argon2.hash(options.password);
    const user = new User();

    try {
      user.username = options.username;
      user.email = options.email;
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
      return req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: Context
  ): Promise<boolean> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    // Generate UUID
    const token = v4();

    // Store in Redis
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3
    );

    // Send email to Nodemailer
    const body = `
    <a href="${BASE_URL}/change-password/${token}" rel="noreferrer" target="_blank">Click here</a>
    `;
    await sendEmail({ email, html: body });

    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("options") options: ForgotPasswordInput,
    @Ctx() { req, redis }: Context
  ): Promise<UserResponse> {
    if (options.newPassword.length <= 3) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "password is too short",
          },
        ],
      };
    }

    // Get redis data
    const userId = await redis.get(FORGET_PASSWORD_PREFIX + options.token);

    // If cannot find user
    if (!userId) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "token expired",
          },
        ],
      };
    }

    const user = await User.findOne({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "user doesn't exists",
          },
        ],
      };
    }

    // Change password
    user.password = await argon2.hash(options.newPassword);
    user.save();

    // Save cookie after
    req.session.userId = userId;

    return {
      user,
    };
  }
}

export default UserResolver;
