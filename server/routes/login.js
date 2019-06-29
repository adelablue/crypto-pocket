const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

router.post('/login', (req, res) => {

    let email = req.body.email;

    User.findOne({email}, (err, user) => {
        if(err) return res.status(500).send('Error on the server');
        if(!user) return res.status(401).send({auth:false, token:null});

        let isValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isValid) return res.status(401).send({auth:false, token:null});

        let token = jwt.sign({id: user._id}, config.secrete, {expiresIn: 86400});

        res.send({auth:true, token, user:{email, isAdmin: user.isAdmin}});
    })
});

module.exports = router;