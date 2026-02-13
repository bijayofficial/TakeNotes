const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    userBio: {
      type: String,
      required: true,
      trim: true,
    },

    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    userMobile: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    userPassword: {
      type: String,
      required: true,
      select: false, // 🔥 hide password from response
    },

    profileImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
