const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    identifier: {
      type: String,
      required: true,
      trim: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Candidate",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
// userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
// userSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   // if (user.isModified('gender')) {
//   //   if(user.gender == "nam"){
//   //     user.avatar = "/static/client/images/user/men.jpg"
//   //   }else {
//   //     user.avatar = "/static/client/images/user/woman.jpg"
//   //   }
//   // }

//   next();
// });

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
