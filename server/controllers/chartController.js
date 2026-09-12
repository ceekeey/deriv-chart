const temporaryResponse = (message) => (req, res) => {
  res.status(200).json({ success: true, message });
};

const getChartLayout = temporaryResponse('Get chart layout endpoint is working');
const saveChartLayout = temporaryResponse('Save chart layout endpoint is working');

module.exports = { getChartLayout, saveChartLayout };
