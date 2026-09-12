const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getWatchlists,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
} = require('../controllers/watchlistController');

const router = express.Router();

router.route('/').get(authMiddleware, getWatchlists).post(authMiddleware, createWatchlist);
router.route('/:id').put(authMiddleware, updateWatchlist).delete(authMiddleware, deleteWatchlist);

module.exports = router;
