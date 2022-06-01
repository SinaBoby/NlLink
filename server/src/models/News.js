const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 200 },
    content: { type: String, required: true },
    sources: [String],
    images: [
      {
        alt: String,
        img: {
          data: Buffer,
          contentType: String,
        },
      },
    ],
    category: {
      type: String,
      enum: ["refugees", "politics", "finance", "society"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
