import jwt from "jsonwebtoken";
import { logError } from "../util/logging.js";
import User from "../models/User.js";

const authenticate = function (req, res) {
  (async () => {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });
      if (!userName || !password) {
        res.status(400).json({
          success: false,
          msg: "BAD REQUEST: Please enter your username and password",
        });
      } else if (!user) {
        res.status(404).json({
          success: false,
          msg: "NOT FOUND: Incorrect userName or password",
        });
      } else {
        const same = await user.isCorrectPassword(password);
        if (!same) {
          res.status(404).json({
            success: false,
            msg: "NOT FOUND: Incorrect password",
          });
        } else {
          // Issue token
          const cookieExpIn = new Date();

          cookieExpIn.setTime(cookieExpIn.getTime() + 60 * 60 * 1000);
          const payload = { userName };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h",
          });
          const userStatus = "authenticated";
          res.status(200);
          res.set("Access-Control-Allow-Origin", req.headers.origin);
          res.set("Access-Control-Allow-Credentials", "true");
          res.set(
            "Access-Control-Expose-Headers",
            "date, etag, access-control-allow-origin, access-control-allow-credentials"
          );

          res.cookie("token", token, {
            httpOnly: true,
            origin: req.headers.origin,
            expires: cookieExpIn,
          });
          res.cookie("userStatus", userStatus, {
            httpOnly: false,
            origin: req.headers.origin,
            expires: cookieExpIn,
          });
          res.json({
            success: true,
            user,
            token: token,
          });
          res.end();
        }
      }
    } catch (error) {
      logError(error);
      res.status(500).json({
        success: false,
        msg: `SERVER ERROR: ${error.message}`,
      });
    }
  })();
};

export default authenticate;
