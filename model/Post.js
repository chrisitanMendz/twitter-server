const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  text: String,
  photoUrl: String,
  likes: [
    {
      uid: String,
      photoUrl: String,
      name: String,
      nickname: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      uid: String,
      photoUrl: String,
      name: String,
      nickname: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  posterUid: String,
  posterName: String,
  posterNickname: String,
  posterImageurl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Post", postSchema);
