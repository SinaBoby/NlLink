import jwt from "jsonwebtoken";
import { logError } from "../util/logging.js";
import User from "../models/User.js";

const authenticate = function (req, res) {
  const { email, password } = req.body;
  // eslint-disable-next-line no-console
  console.log(email);
  User.findOne({ email }, function (err, user) {
    if (err) {
      logError(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h",
          });
          // eslint-disable-next-line no-console
          console.log(token);
          res.status(200);
          res.cookie("token", token, {
            httpOnly: true,
            origin: "http://localhost:8080",
          });
          res.json({ success: true });
          res.end();
        }
      });
    }
  });
};

export default authenticate;
