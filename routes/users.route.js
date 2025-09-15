const router = require('express').Router();
const { createUser, getUsersList } = require('../controllers/users.controller');


router.post('/createUser', createUser);
router.get('/getUsers', getUsersList);

module.exports = router;