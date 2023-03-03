const { validationResult, check } = require('express-validator');

/* A middleware that validates the fields of the request. */
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};
/* An array of validations. */
exports.signupValidations = [
  check('name', 'The name is required').not().isEmpty(),
  check('email', 'The email is required').not().isEmpty(),
  check('email', 'The email must have a correct forma').isEmail(),
  check('password', 'The name is required').not().isEmpty(),
];
/* Validating the login fields. */
exports.loginValidation = [
  check('email', 'The email is required').not().isEmpty(),
  check('email', 'The email must have a correct forma').isEmail(),
  check('password', 'The name is required').not().isEmpty(),
];
/* Validating the fields of the request. */
exports.updateUserValidation = [
  check('name', 'The name  is required').not().isEmpty(),
  check('email', 'The email  is required').not().isEmpty(),
  check('email', 'The email must have a correct format').isEmail(),
];

/* Validating the fields of the request. */
exports.createRestaurantValidation = [
  check('name', 'The name  is required').not().isEmpty(),
  check('address', 'The address  is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be numeric').isNumeric(),
];

/* Validating the fields of the request. */
exports.createReviewValidation = [
  check('comment', 'The comment  is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be numeric').isNumeric(),
];
