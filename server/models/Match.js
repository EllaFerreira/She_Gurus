const { model, Schema } = require("mongoose");

const matchSchema = new Schema({
  matchDate: {
    type: Date,
    default: Date.now,
  },
  gurus: [
    {
      type: Schema.Types.ObjectId,
      ref: "Guru",
    },
  ],
});

module.exports = model("Match", matchSchema);
