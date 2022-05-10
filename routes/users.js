var express = require('express');
var router = express.Router();

// Controllers
const { login, resetPassword } = require('../controllers/users.controller');

/* GET users listing. */
router.post('/login', login);
router.post('/reset-password', resetPassword);

module.exports = router;
