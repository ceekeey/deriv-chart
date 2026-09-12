const temporaryResponse = (message) => (req, res) => {
  res.status(200).json({ success: true, message });
};

const getWatchlists = temporaryResponse('Get watchlists endpoint is working');
const createWatchlist = temporaryResponse('Create watchlist endpoint is working');
const updateWatchlist = temporaryResponse('Update watchlist endpoint is working');
const deleteWatchlist = temporaryResponse('Delete watchlist endpoint is working');

module.exports = { getWatchlists, createWatchlist, updateWatchlist, deleteWatchlist };
