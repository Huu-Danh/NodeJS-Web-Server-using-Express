const express = require('express');
const multer = require('multer');
const controller = require('../controllers/user.controller');
const router = express.Router();
var validate = require('../validate/user.valdate');
var upload = multer({dest: './public/uploads/'});

router.get('/',controller.index);

router.get('/cookie', controller.cookie);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('avatar'), validate.postCreate , controller.postCreate);
module.exports = router;
