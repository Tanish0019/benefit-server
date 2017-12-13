'use strict';
const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.send('Welcome to the BeneFit Server');
});

module.exports = router;