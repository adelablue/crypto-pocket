const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

router.post('/register', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    User.create({
        email,
        password: bcrypt.hashSync(password, 8),
        isAdmin: false
    }, (err, user) => {
        if(err) return res.status(400).send(err);

        let token = jwt.sign({id: user._id}, config.secrete, {expiresIn: 86400});

        res.send({auth:true, token, user:{email, isAdmin: user.isAdmin}});
    })
});

module.exports = router;