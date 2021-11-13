const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  uid: String,
  firstName: String,
  lastName: String,
  name: String,
  email: String,
  imageUrl: String,
  nickname: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
