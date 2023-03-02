const bcrypt = require('bcryptjs');
//const { classToInvokable } = require('sequelize/types/utils');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware that validates if the user exists in the database. */
exports.validUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user is not registered', 401));
  }

  req.user = user;
  next();
});

/* A middleware that validates if the user exists in the database. */
exports.validPassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;
  if (!(await bcrypt.compare(password, user.password))) {
    //TODO: lo que se deberia hacer es hacerle un update a true al estado de la cuenta
    return next(new AppError('Invalid Credentials', 401));
  }

  next();
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: true,
    },
  });
  if (!user) {
    return next(
      new AppError('The owner of this token it no longer available', 401)
    );
  }
  req.sessionUser = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;
  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'availabled',
    },
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
  next();
});
