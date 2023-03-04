/* Importing the modules that are needed for the server to work. */
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const { restaurantRouter } = require('../routes/restaurant.routes');
const { mealRouter } = require('../routes/meal.routes');
const { orderRouter } = require('../routes/order.routes');
const { userRouter } = require('../routes/user.routes');
const { db } = require('../database/db');

const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const initModel = require('./init.model');

/* The constructor function is used to define the application, the port, the limiter, the paths, the
database, the middlewares and the routes. */
class Server {
  /**
   * The constructor function is used to define the application, the port, the limiter, the paths, the
   * database, the middlewares and the routes.
   */
  constructor() {
    //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 3000;
    this.limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many request from this IP, please try again in an hour!',
    });

    /* A constant that is used to define the paths of the application. */
    this.paths = {
      auth: '/api/v1/auth',
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    };

    /* Connecting to the database. */
    this.database();

    /* Setting up the middlewares for the application. */
    this.middlewares();

    /* Calling the routes function. */
    this.routes();
  }

  /**
   * This function is used to set up middlewares for the application.
   */
  middlewares() {
    this.app.use(helmet());

    this.app.use(xss());

    this.app.use(hpp());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use('/api/v1', this.limiter);
    this.app.use(cors());
    this.app.use(express.json());
  }

  //RUTAS
  /**
   * This function is used to define the routes for the application
   */
  routes() {
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.meal, mealRouter);
    this.app.use(this.paths.order, orderRouter);
    this.app.use(this.paths.restaurant, restaurantRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    // relations
    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
