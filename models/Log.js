const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comment: String,
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Log = mongoose.model("Log", LogSchema);
module.exports = Log;
