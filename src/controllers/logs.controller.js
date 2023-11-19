const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { logService } = require('../services');



const getFilterLogs = catchAsync(async (req, res) => {
  console.log(req.body)
  const jsonArray = await logService.getFilterLogs(req.body);
  if (!jsonArray) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No logs Found');
  }
  res.send(jsonArray);
});


module.exports = {
  getFilterLogs,
};
