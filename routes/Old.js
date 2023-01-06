// const express = require('express');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const {validateEmail,validateName,validatePassword} = require('../utils/Validator');
// const User =  require('../models/userModels');
// let users = {};

// const createDb = require('../config/db');
// // Sync all defined models to the DB
// createDb.sync().then(()=>{
//     console.log(`Db is running`)
// });

// router.get('/', (_req,res)=>{
//     res.status(200).send(`server is running fine.`)
// }); 

// router.post("/signup", async(req,res)=>{
//     try{
//         console.log(users);
//         const { name , email , password } = req.body; // destructuring name, email and password out of the request body

//         console.log(name,email,password);
        
//         const userExist = users.hasOwnProperty(email);
//         if(userExist){
//             res.send("user exist");
//         }
        
//         if(!validateName(name)){
//             res.send("Invalid name")
//         }
//         if(!validateEmail(email)){
//             res.send("Invalid email")
//         }
//         // if(!validatePassword(password)){
//         //     res.send("Invalid password")
//         // }

//         const Epass = await bcrypt.hash(password,10);
//         users[email] = {name, password: Epass};

//         res.send("success");

//     }catch(e){
//         console.log(e);
//     }
// });

// router.post("/signin", async(req,res)=>{
//     try{
//         const {email,password} = req.body;
//         console.log(users);
//         const userExist = users.hasOwnProperty(email);

//         if(!userExist)
//             res.send("user doesn't exist");

//         const passMatch = await bcrypt.compare(password,users[email].password);

//         if(!passMatch)
//             res.send(`password mismatch`);
        
//         res.send(`success`);
//     }catch(e){

//     }
// })

// module.exports = router;