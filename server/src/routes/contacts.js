import express from "express";
import withAuth from "../middlewares/middleware.js";
import { getContacts } from "../controllers/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", withAuth, getContacts);

export default contactsRouter;
