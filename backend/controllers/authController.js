const User=require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {name,email,password,role}=req.body:
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user=new User({name,email,password:hashedPassword,role});
        await user.save();
        res.status(201).json({message: 'User registered'});
    }catch(err)
    {
        res.status(400).json({error:'Email already exists.'});
    }
}