const { wrap } = require('async-middleware');
const router = require('express').Router();

const data = require('./index.js');

router.post('/students', wrap(data));

module.exports = router;
