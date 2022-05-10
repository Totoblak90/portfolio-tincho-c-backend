var express = require('express');
var router = express.Router();

// Controllers
const userController = require('../controllers/users.controller')

/* GET users listing. */
router.get('/', userController.list);

module.exports = router;
