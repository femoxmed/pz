const _ = require('lodash');
const { phValidate, ph } = require('../models/ProvideHelp');
const { Users } = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');



router.post('/', async(req, res) => {

    //validate data from the ph for (req.body)
    const { error } = phValidate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const user = await Users.findById(req.body.user_id);

    const PH = new ph({
        name: `${user.firstName} ${user.lastName}`,
        phone_number: user.phone_number,
        user_id: req.body.user_id
    });

    const data = await PH.save();

    res.send(data);



})


module.exports = router