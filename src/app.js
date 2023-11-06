const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const schedule = require('node-schedule');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const bodyParser = require('body-parser');

// var upload = multer();
require('./config/redis');


const app = express();
app.use(bodyParser.json());

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const { generateReport } = require('./jobs/orderReport');
const { generateCollectionReport } = require('./jobs/collection_report');
const { generateContainerAtRestaurantReport } = require('./jobs/restaurant_container_wise_report');
const { generateOrderCreationReport } = require('./jobs/order_creation_report');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6, 7];
rule.hour = 1;
rule.minute = 30;

schedule.scheduleJob(rule, function () {
  generateReport(new Date());
  generateCollectionReport(new Date());
  generateContainerAtRestaurantReport();
  generateOrderCreationReport(new Date());
  console.log('Reports generated');
});

// generateOrderCreationReport(new Date());
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
// for (var d = new Date(2022, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
//   // daysOfYear.push(new Date(d));
//   generateReport(new Date(d));
// }
module.exports = app;
