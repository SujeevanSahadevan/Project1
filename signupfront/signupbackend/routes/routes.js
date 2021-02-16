const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const signupTemplateCopy=require('../models/signupModels');
const bcrypt=require('bcrypt');

router.post('/signup',async (request,response)=>{

    const saltPassword=await bcrypt.genSalt(10);
    const securePassword=await bcrypt.hash(request.body.password,saltPassword)

    const signedUpUser=new signupTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        email:request.body.email,
        password:securePassword
    })

    signedUpUser.save().then(data=>{response.json(data)})
    .catch(error=>{response.json(error)})
});

module.exports=router;

//routes folder is responsible for all the requests comes to the server