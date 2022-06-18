import mongoose from "mongoose";
//import User from "./User"
export const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "User",
    },
    body: {
      type: String,
      maxLength: 255,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seen: Boolean,
    edited: Boolean,
  },
  { timestamps: true }
);
MessageSchema.statics.latest = (count) => {
  return Message.find({}).sort({ _id: "desc" }).limit(count);
};

export const Message = mongoose.model("Message", MessageSchema);
/* module.exports = {
  Schema: MessageSchema,
  Model: MessageModel,
}; */
//module.exports = mongoose.model("Message", messageSchema);
