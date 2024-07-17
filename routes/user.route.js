const express = require('express');
const controller = require('../controllers/user.controller');
const router = express.Router()
var validate = require('../validate/user.valdate')


router.get('/', controller.index);

router.get('/cookie', controller.cookie);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate , controller.postCreate);
module.exports = router;
