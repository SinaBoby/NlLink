import jwt from "jsonwebtoken";
import { logError } from "../util/logging.js";
import User from "../models/User.js";

const authenticate = function (req, res) {
  const { email, password } = req.body;
  // eslint-disable-next-line no-console
  console.log(email);
  (async () => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          error: "Incorrect email or password",
        });
      } else {
        const same = await user.isCorrectPassword(password);
        if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email };
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
