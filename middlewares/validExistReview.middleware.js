const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validateExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!review) {
    return next(new AppError('Review not found', 404));
  }
  req.review = review;
  next();
});
