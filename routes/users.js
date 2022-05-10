var express = require('express');
var router = express.Router();

// Controllers
const { login, resetPassword } = require('../controllers/users.controller');

/* GET users listing. */
router.post('/', login);
router.post('/', resetPassword);

module.exports = router;
