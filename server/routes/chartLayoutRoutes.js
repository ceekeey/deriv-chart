const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createChartLayout,
  getChartLayouts,
  getChartLayoutById,
  updateChartLayout,
  deleteChartLayout,
} = require("../controllers/chartLayoutController");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createChartLayout)
  .get(authMiddleware, getChartLayouts);

router
  .route("/:id")
  .get(authMiddleware, getChartLayoutById)
  .put(authMiddleware, updateChartLayout)
  .delete(authMiddleware, deleteChartLayout);

module.exports = router;
