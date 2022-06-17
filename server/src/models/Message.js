import mongoose from "mongoose";
export const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      maxLength: 255,
    },
    date: {
      type: Date,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Chat",
    },
    seen: Boolean,
    edited: Boolean,
  },
  { timestamps: true }
);
MessageSchema.statics.latest = (count) => {
  return Message.find({}).sort({ _id: "desc" }).limit(count);
};

MessageSchema.statics.create = (content) => {
  let msg = new Message({
    date: new Date(),
    content: content,
  });

  return msg.save();
};
export const Message = mongoose.model("Message", MessageSchema);
/* module.exports = {
  Schema: MessageSchema,
  Model: MessageModel,
}; */
//module.exports = mongoose.model("Message", messageSchema);
