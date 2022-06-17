// Load our .env variables
import dotenv from "dotenv";
import express from "express";
dotenv.config();
//import * as Message from "./models/Message";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { logInfo, logError } from "./util/logging.js";
import connectDB from "./db/connectDB.js";
import testRouter from "./testRouter.js";
import { Message, MessageSchema } from "./models/Message.js";
import seedActivityCollection from "./db/seedMockActivityData.js";
import seedNewsCollection from "./db/seedMockNews.js";
// import Activity from "./models/Activity.js";

// The environment should set the port
const port = process.env.PORT;

if (port == null) {
  // If this fails, make sure you have created a `.env` file in the right place with the PORT set
  logError(new Error("Cannot find a PORT number, did you create a .env file?"));
}

const startServer = async () => {
  try {
    await connectDB();
    const httpServer = createServer(app);
    const io = new Server(httpServer);
    io.on("connection", async (socket) => {
      logInfo("client connected...");
      socket.on("message", async (msg) => {
        logInfo(msg);
        let message = await new Message(msg);
        io.emit("message", message);
      });
      let latest = await MessageSchema.statics.latest(10);
      socket.emit("latest", latest);
    });
    httpServer.listen(port, () => {
      logInfo(`Server started on port ${port}`);
    });
  } catch (error) {
    logError(error);
  }
};

// seed mock Data to DB

Promise.all([seedActivityCollection, seedNewsCollection]).catch((error) =>
  logError(error)
);

// Promise.all([seedNewsCollection]).catch((error) => logError(error));
// seedActivityCollection()
//   .then(() => {
//     return Activity.find();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => logError(e));

/****** Host our client code for Heroku *****/
/**
 * We only want to host our client code when in production mode as we then want to use the production build that is built in the dist folder.
 * When not in production, don't host the files, but the development version of the app can connect to the backend itself.
 */
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(new URL("../../client/dist", import.meta.url).pathname)
  );
  // Redirect * requests to give the client data
  app.get("*", (req, res) =>
    res.sendFile(
      new URL("../../client/dist/index.html", import.meta.url).pathname
    )
  );
}

/****** For cypress we want to provide an endpoint to seed our data ******/
if (process.env.NODE_ENV !== "production") {
  app.use("/api/test", testRouter);
}

// Start the server
startServer();
