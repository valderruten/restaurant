const User = require('..//models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');

/* A function that is exported to be used in other files. */
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'normal' } = req.body;
  const user = new User({ name, email, password, role });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'sucess',
    id: user.id,
    token,
  });
});

/* A function that is exported to be used in other files. */
exports.login = catchAsync(async (req, res, next) => {
  const { user } = req;
  const token = await generateJWT(user.id);
  res.json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
    },
  });
});

/* Updating the user. */
exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({ name, email });
  res.status(200).json({
    sttus: 'success',
    message: 'The user has been updated',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const { user } = req;

  const orders = await Order.findAll({
    where: {
      id: user.id,
      status: 'available',
    },
    include: [
      {
        model: Order,
        where: {
          status: 'completed',
        },
      },
    ],
  });

  res.status(200).json({
    orders,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const { user } = req.params;

  const order = await Order.findOne({
    where: {
      id: user.id,
      id,
      status: 'active',
    },
    include: [
      {
        model: Order,
        where: {
          status: 'completed',
        },
      },
    ],
  });
  res.status(200).json({
    order,
  });
});
