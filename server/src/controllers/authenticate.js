import jwt from "jsonwebtoken";
import { logError } from "../util/logging.js";
import User from "../models/User.js";

const authenticate = function (req, res) {
  const { userName, password } = req.body;
  // eslint-disable-next-line no-console
  console.log(userName);
  (async () => {
    try {
      const user = await User.findOne({ userName });
      if (!user) {
        res.status(401).json({
          error: "Incorrect userName or password",
        });
      } else {
        const same = await user.isCorrectPassword(password);
        if (!same) {
          res.status(401).json({
            error: "Incorrect userName or password",
          });
        } else {
          // Issue token
          const cookieExpIn = new Date();

          cookieExpIn.setTime(cookieExpIn.getTime() + 60 * 60 * 1000);
          const payload = { userName };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h",
          });
          res.status(200);
          res.set("Access-Control-Allow-Origin", req.headers.origin);
          res.set("Access-Control-Allow-Credentials", "true");
          res.set(
            "Access-Control-Expose-Headers",
            "date, etag, access-control-allow-origin, access-control-allow-credentials"
          );
          res.cookie("token", token, {
            httpOnly: true,
            origin: "http://localhost:8080",
            expires: cookieExpIn,
          });
          res.json({ success: true });
          res.end();
        }
      }
    } catch (error) {
      logError(error);
      res.status(500).json({
        error: "Internal error please try again",
      });
    }
  })();
};

export default authenticate;
