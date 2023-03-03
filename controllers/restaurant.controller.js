const Restaurant = require('../models/restaurant.model');
const User = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review.model');

exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'The Restaurant was created successfully',
    restaurant,
  });
});
exports.findRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'availabled',
    },
  });
  res.status(200).json({
    status: 'success',
    restaurants,
  });
});
exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;
  const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: restaurant.id,
    rating,
  });
  res.status(201).json({
    status: 'succcess',
    review,
  });
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;
  await review.update({
    comment,
    rating,
  });
  res.status(201).json({
    status: 'succcess',
    message: 'The review has been updated',
  });
});
