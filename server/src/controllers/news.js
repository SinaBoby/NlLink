import mongoose from "mongoose";
import News from "../models/News.js";
import { logError, logInfo } from "../util/logging.js";
import * as fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

export const getNews = async (req, res) => {
  try {
    const { newsCategory } = req.params;
    if (newsCategory === "all") {
      const news = await News.find();
      res.status(200).json({ success: true, result: news });
    } else {
      const news = await News.find({
        category: { $regex: new RegExp(newsCategory, "i") },
      });
      res.status(200).json({ success: true, result: news });
    }
  } catch (e) {
    res
      .status(500)
      .json({ success: false, msg: "Unable to get news, try again later" });
  }
};

export const getNewsDetails = async (req, res) => {
  try {
    const { newsId } = req.params;
    const newsDetails = await News.find({
      _id: mongoose.Types.ObjectId(newsId),
    });

    res.status(200).json({ success: true, result: newsDetails });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, msg: "Unable to get news, try again later" });
  }
};

export const addNews = async (req, res) => {
  try {
    const filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(filename);
    console.log(req.body);
    const { title, content, category, sources } = req.body;
    const image = {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    };
    let news = {
      title,
      content,
      category,
      sources,
      image,
    };

    const newNews = await News.create(news);
    const allNews = await News.find();
    logInfo(allNews);
    return res.status(201).json({ success: true, user: newNews });
  } catch (error) {
    let errors = [];
    logError(error.errors);
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res.status(400).json({ success: false, msg: "status 400" });
    } else {
      logError(error);
      return res.status(500).json({
        success: false,
        msg: `Server Error: ${error.message} not uploaded`,
      });
    }
  }
};
