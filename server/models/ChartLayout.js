const mongoose = require("mongoose");

const chartLayoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    symbol: { type: String, required: true, trim: true },
    timeframe: { type: String, required: true, trim: true },
    layout: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
    // legacy/optional fields kept for compatibility
    drawings: { type: [mongoose.Schema.Types.Mixed], default: [] },
    indicators: { type: [mongoose.Schema.Types.Mixed], default: [] },
    chartSettings: { type: mongoose.Schema.Types.Mixed, default: {} },
    syncVersion: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Do not create a unique index here to allow multiple named layouts per user

module.exports =
  mongoose.models.ChartLayout ||
  mongoose.model("ChartLayout", chartLayoutSchema);
