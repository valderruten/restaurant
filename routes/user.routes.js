const { Router } = require('express');
const router = Router();
const { signup, login, updateUser, deleteUser } = require('../controllers/user.controller');
const { sign } = require('jsonwebtoken');

const {
  validUserByEmail,
  validUser,
  validPassword,
  protectAccountOwner,
  protect,
} = require('../middlewares/user.middleware');
const {
  signupValidations,
  validateFields,
  loginValidation,
  updateUserValidation,
} = require('../middlewares/validations.middleware');

router.post('/signup', signupValidations, validateFields, signup);
router.post(
  '/login',
  loginValidation,
  validateFields,
  validUserByEmail,
  validPassword,
  login
);
router.use(protect);
router.patch(
  '/:id',
  updateUserValidation,
  validateFields,
  validUser,
  protectAccountOwner,
  updateUser
);
router.delete('/:id', 
validateFields, protectAccountOwner, deleteUser);
module.exports = {
  userRouter: router,
};
