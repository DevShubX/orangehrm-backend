const router = require('express').Router();
const auth = require('./auth.route');
const users = require('./users.route');

router.use('/auth', auth);
router.use('/users', users);

module.exports = router;