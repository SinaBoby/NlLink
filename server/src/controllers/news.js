import mongoose from "mongoose";
import News from "../models/News.js";

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
