const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshController');

router.route('/refresh').get(refreshController.handleRefresh);

module.exports = router;
