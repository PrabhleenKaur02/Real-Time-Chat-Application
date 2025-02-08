const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

const router = express.Router();

// homepage
router.get('/homepage', async(req, res)=> {
    return res.send("Your Khhat is here!");
})
// signup route
router.post('/signup', async(req, res)=> {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        password: hashedPassword
    });
    await user.save();
    res.status(201).send('User created succesfully!');
});

// login route
router.post('/login', async(req, res)=> {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.json({ token });
    }
        else {
            res.status(401).send('Invalid Credentials');
        }
    });

    module.exports = router;