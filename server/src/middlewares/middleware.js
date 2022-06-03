import jwt from "jsonwebtoken";
import { logInfo } from "../util/logging.js";
const withAuth = function (req, res, next) {
  logInfo(req.headers);
  const token = req.cookies.token;
  if (!token) {
    res
      .status(401)
      .json({ success: false, msg: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res
          .status(401)
          .json({ success: false, msg: "Unauthorized: Invalid Token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};
export default withAuth;
