const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const createDb = require('../config/db');
const User = require('../models/userModels');
const nodemailer = require('nodemailer');
const { validateEmail, validateName, validatePassword } = require('../utils/Validator');

// Sync all defined models to the DB
createDb.sync().then(() => {
    console.log(`Db is running`);
});

router.get('/', (_req, res) => {
    res.status(200).send(`Server is running proerly.`);
});

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({
            where: {
                email
            }
        });

        if (userExist)
            return res.status(403).send(`User: ${name} already exist`);

        if (!validateEmail(email)) {
            return res.status(400).send("Invalid Email Address.")
        }
        if (!validatePassword(password)) {
            return res.status(400).send("Invalid Password length");
        }

        //Encrypt the password.
        const passwordEncrypt = await bcrypt.hash(password, 10);

        const saveData = {
            name, email, password: passwordEncrypt
        };
        const userCreated = await User.create(saveData);

        console.log(userCreated);

        res.status(201).send("User successfully registered.");

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email.length === 0) {
            return res.status(400).send("Error: Please enter your email");
        }
        if (password.length === 0) {
            return res.status(400).send("Error: Please enter your password");
        }

        const userExist = await User.findOne({
            where: {
                email: email
            }
        });

        if (!userExist)
            return res.status(403).send(`User does not exist`);
            
        //* hashes the entered password and then compares it to the hashed password stored in the database
        const passMatch = await bcrypt.compare(password, userExist.password);

        if (!passMatch) {
            return res.status(400).send("Error: Incorrect password");
        }

        return res.status(200).send(`Welcome ${userExist.name}. You are logged in`);
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Error: ${err.message}`);
    }
});

router.post("/forgotPassword", async(req,res)=>{
    try{
        const {email} = req.body;
        if (email.length === 0) {
            return res.status(400).send("Error: Please enter your email");
        }
        const userExist = await User.findOne({
            where:{
                email:email
            }
        });
        if(!userExist){
            return res.status(403).send(`User does not exist`);
        }
        if(userExist.email !== email){
            return res.status(403).send(`Please provide the registed Email Address.`);
        }

        // User Send Email + User token;
        let randomNum = (Math.floor(Math.random() * 10000)) + userExist.name;

        const token = await bcrypt.hash(randomNum, 5);
        await User.update({token:token},{where:{email:email}});

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.NodeMailerEmail,
                pass: process.env.NodeMailerPassword,
            }
        });

        const emailStruct = {
            from: `"Auth System" <${process.env.NodeMailerEmail}>`, // sender address
            to : email,
            subject: "Reset Password.", // Subject line
            html : `<p> Hello ${userExist.name}, Please verify your email using the link <a href="http://localhost:${process.env.port}/resetPassword.html?token=${token}"> reset your password. </a></p>`,
            text : `<p> Hello ${userExist.name}, Please verify your email using the link <a href="http://localhost:${process.env.port}/resetPassword.html?token=${token}"> reset your password. </a></p>`,
        };
        
        transporter.sendMail(emailStruct, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).send(`Can not sent the email at this moment ${error}`)
            } else {
                console.log(`Email has been sent:- ${info.response}`);
            }
        });
        return res.status(200).send("Email has been sent.");
    }catch(err){
        console.log(err);
        return res.status(400).send(`Error: ${err.message}`);
    }
});

router.post("/resetPassword",async(req,res)=>{
    try{
        const {password} = req.body;
        const {paramToken} = req.query.token;

        console.log(req);
        const userExist = await User.findOne({
            where:{
                token:paramToken
            }
        });

        if(!userExist){
            return res.status(403).send(`Token is expired. Please reset password again`);
        }
        
        const newPassword = await bcrypt.hash(password,10);

        await User.update({password:newPassword, token:''},{
            where:{
                token:paramToken
            }
        });
        res.status(200).send(`${userExist.name}, password has been successfully changes `);
        res.sendFile('/public/index.html');
    }catch(err){
        console.log(err);
        return res.status(400).send(`Error: ${err.message}`);
    }
});

module.exports = router;


