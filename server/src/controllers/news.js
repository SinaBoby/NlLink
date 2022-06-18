import mongoose from "mongoose";
import News from "../models/News.js";
import { logError, logInfo } from "../util/logging.js";
import { s3UploadFile } from "./s3upload.js";
import fs from "fs";
import util from "util";

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
    logInfo(newsId);
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

export const getOneNewsDetails = async (req, res) => {
  logInfo("server side");
  res.status(200).json({ success: true });
};

export const addNews = async (req, res) => {
  try {
    const { title, content, category, sources } = req.body;
    const file = req.file;
    const uploadedImage = await s3UploadFile(file);
    const news = {
      title,
      content,
      category,
      sources,
      image: uploadedImage.Location,
    };
    const createdNews = await News.create(news);
    const unlinkFile = util.promisify(fs.unlink);

    unlinkFile(file.path);

    return res.status(201).json({ success: true, result: createdNews });
  } catch (error) {
    const errors = [];
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res
        .status(400)
        .json({ success: false, msg: `Bad Request: ${errors}` });
    } else {
      logError(error);
      return res.status(500).json({
        success: false,
        msg: `Server Error: ${error.message} not uploaded`,
      });
    }
  }
};
