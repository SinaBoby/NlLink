import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import authenticateRouter from "./routes/authenticate.js";
import withAuth from "./middlewares/middleware.js";
// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
const corsOptions = {
  origin:
    "http://localhost:8080" || "https://c35-newcomers-develop.herokuapp.com/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Add middleware so that can express can parse cookies passed by our browser
app.use(cookieParser());
/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/authenticate", authenticateRouter);
app.get("/checkToken", withAuth, function (req, res) {
  res.status(200);
  res.send("token is there");
});
export default app;
