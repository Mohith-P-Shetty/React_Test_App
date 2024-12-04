const express = require('express');
const { findAdmin } = require("../controllers/adminController")

const router = express.Router();
router.post('/find', findAdmin);

module.exports = router;