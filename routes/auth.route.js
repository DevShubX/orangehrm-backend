const express = require('express');
const router = express.Router();

const { signinUser, authorizeUser } = require('../controllers/auth.controller');


router.post('/signin', signinUser);
router.get('/authorize', authorizeUser);

module.exports = router;