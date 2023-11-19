const express = require('express');
const logRoute = require('./logs.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/v1',
    route: logRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
