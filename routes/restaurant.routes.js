const { Router } = require('express');
const {
  createReview,
  createRestaurant,
  findRestaurants,
  updateReview,
} = require('../controllers/restaurant.controller');
const {
  validExistRestaurant,
  validExistRestaurantId,
} = require('../middlewares/restaurant.middleware');
const { protect } = require('../middlewares/user.middleware');
const {
  validateFields,
  createReviewValidation,
  createRestaurantValidation,
} = require('../middlewares/validations.middleware');
const {
  validateExistReview,
} = require('../middlewares/validExistReview.middleware');
const router = Router();

router.use(protect);
router.post('/', createRestaurantValidation, validateFields, createRestaurant);
module.exports = {
  restaurantRouter: router,
};

router.get('/', findRestaurants);

router.post(
  '/reviews:id',
  createReviewValidation,
  validateFields,
  validExistRestaurant,
  createReview
);

router.patch(
  '/reviews/:restaurantId/:id',
  createReviewValidation,
  validateFields,
  validExistRestaurantId,
  validateExistReview,

  updateReview
);

module.exports = {
  restaurantRouter: router,
};
