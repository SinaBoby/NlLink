import News from "../models/News.js";

const getNews = async (req, res) => {
  try {
    const news = await News.find();
    console.log(news, "newss news func");
    res.status(200).json({ success: true, result: news });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, msg: "Unable to get news, try again later" });
  }
};

export default getNews;
