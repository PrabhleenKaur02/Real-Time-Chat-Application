const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

const router = express.Router();

// homepage
router.get('/', async(req, res)=> {
    return res.send("Your Khhat is here!");
})

module.exports = router;