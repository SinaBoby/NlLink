import bcrypt from "bcrypt";
import { logError } from "../util/logging.js";

const getUserWithHashedPassword = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return {
      ...user,
      password: hashedPassword,
    };
  } catch (error) {
    logError(error);
  }
};

export default getUserWithHashedPassword;
