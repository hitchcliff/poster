import { Context } from "../../types";
import User from "../../entities/User";
import { v4 } from "uuid";
import { BASE_URL, FORGET_PASSWORD_PREFIX } from "../../utils/constants";
import { sendEmail } from "../../utils";

const ForgotPasswordMutation = async (email: string, { redis }: Context) => {
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
};

export default ForgotPasswordMutation;
