import User from "../models/User.js";
import { logInfo, logError } from "../util/logging.js";

export const findMatches = async (req, res) => {
  try {
    const userName = req.userName;
    if (!userName) {
      return res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      const { province, interests } = req.body;

      if (!province || !interests) {
        return res.status(400).json({
          msg: "Bad Request",
        });
      }

      logInfo(`${province}, ${interests}`);

      // Get the logged in user
      const currentUserType = await User.findOne({ userName }, { userType: 1 });

      logInfo(`currentUserTyoe ${currentUserType.userType}`);

      // Filter by province
      const usersByProvince = await User.find({
        province,
      });

      // Keeps only locals
      const usersByType = usersByProvince.filter(
        (user) => user.userType !== currentUserType.userType
      );

      // filter by Interests
      const usersByInterests = interests.map((interest) =>
        usersByType.filter((user) => user.interests.includes(interest))
      );

      const finalListOfUsers = usersByInterests.reduce(
        (acc, current) => [
          ...acc,
          ...current.filter((item) => !acc.includes(item)),
        ],
        usersByInterests[0]
      );

      // Return all users but the current user.
      return res.status(200).json({
        success: true,
        users: finalListOfUsers.filter((user) => user.userName !== userName),
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
