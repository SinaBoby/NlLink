import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const addInterest = async (req, res) => {
  const userName = req.userName;

  const { interest } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      throw new Error("Internal Server Error");
    }

    await User.updateOne(
      { userName },
      {
        $set: { interests: [...user.interests, interest] },
      }
    );

    return res.status(200).json({
      success: true,
      interest,
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const deleteInterest = async (req, res) => {
  const userName = req.userName;

  try {
    const user = await User.findOne({ userName });
    const { interest } = req.body;
    if (!user) {
      throw new Error("Internal Server Error");
    }

    await User.updateOne(
      {
        userName,
      },
      {
        $set: { interests: user.interests.filter((item) => item !== interest) },
      }
    );

    return res.status(200).json({
      success: true,
      interest,
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
