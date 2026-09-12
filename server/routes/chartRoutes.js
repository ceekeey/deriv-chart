const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getChartLayout, saveChartLayout } = require('../controllers/chartController');

const router = express.Router();

router
  .route('/:symbol/:timeframe')
  .get(authMiddleware, getChartLayout)
  .put(authMiddleware, saveChartLayout);

module.exports = router;
