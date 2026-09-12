const mongoose = require("mongoose");
const ChartLayout = require("../models/ChartLayout");

function sendError(res, status, message) {
  return res.status(status).json({ success: false, message });
}

async function createChartLayout(req, res) {
  try {
    const { name, symbol, timeframe, layout } = req.body || {};

    if (!name || !symbol || !timeframe || !layout) {
      return sendError(res, 400, "Missing required fields");
    }

    const newLayout = new ChartLayout({
      user: req.user._id,
      name: String(name).trim(),
      symbol: String(symbol).trim(),
      timeframe: String(timeframe).trim(),
      layout,
    });

    await newLayout.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "Chart layout created successfully",
        data: { layout: newLayout },
      });
  } catch (error) {
    return sendError(res, 500, "Failed to create chart layout");
  }
}

async function getChartLayouts(req, res) {
  try {
    const layouts = await ChartLayout.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    return res
      .status(200)
      .json({ success: true, data: { layouts, count: layouts.length } });
  } catch (error) {
    return sendError(res, 500, "Failed to fetch chart layouts");
  }
}

async function getChartLayoutById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid layout ID");
    }

    const layout = await ChartLayout.findOne({ _id: id, user: req.user._id });

    if (!layout) return sendError(res, 404, "Chart layout not found");

    return res.status(200).json({ success: true, data: { layout } });
  } catch (error) {
    return sendError(res, 500, "Failed to fetch chart layout");
  }
}

async function updateChartLayout(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid layout ID");
    }

    const allowed = ["name", "symbol", "timeframe", "layout"];
    const update = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    });

    if (Object.keys(update).length === 0) {
      return sendError(res, 400, "No updatable fields provided");
    }

    const layout = await ChartLayout.findOne({ _id: id, user: req.user._id });
    if (!layout) return sendError(res, 404, "Chart layout not found");

    Object.assign(layout, update);
    await layout.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Chart layout updated",
        data: { layout },
      });
  } catch (error) {
    return sendError(res, 500, "Failed to update chart layout");
  }
}

async function deleteChartLayout(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid layout ID");
    }

    const layout = await ChartLayout.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!layout) return sendError(res, 404, "Chart layout not found");

    return res
      .status(200)
      .json({ success: true, message: "Chart layout deleted successfully" });
  } catch (error) {
    return sendError(res, 500, "Failed to delete chart layout");
  }
}

module.exports = {
  createChartLayout,
  getChartLayouts,
  getChartLayoutById,
  updateChartLayout,
  deleteChartLayout,
};
