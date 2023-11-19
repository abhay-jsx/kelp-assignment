const express = require('express');
const logController = require('../../controllers/logs.controller');

const router = express.Router();

router
  .route('/filter-log')
  .post(logController.getFilterLogs);

module.exports = router;