const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');



const getUser = catchAsync(async (req, res) => {
  const jsonArray = await userService.getUserStats();
  // console.log(jsonArray)
  if (!jsonArray) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(jsonArray);
});



module.exports = {
  getUser,
};