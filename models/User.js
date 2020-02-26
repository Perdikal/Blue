const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    password: { type: String, required: true },
    image_Url: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYuIRmLMgwJRhONvJimSmKhV23zgXYSqy_7g_PZ3n1QyYF4iqw"
    },
    manager: Boolean,
    role: String,
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
