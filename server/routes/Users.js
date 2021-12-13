const express = require('express');
const app = express.Router();
const { Users } = require("../models")
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken')
const config = process.env
const {validateToken} = require("../middleware/auth")
// Multer define
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'Images')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage, 
}).single('picture_img')
// 1. Get all user
app.get("/",validateToken, async (req, res) => {
    const  user = await Users.findAll()
    res.json(user)
});

// 1.2 Get user by id
app.get('/:id',validateToken,async (req, res) => {
    const id = req.params.id

    const userId = await Users.findOne({id: id})
    res.json({data: userId})
})
// 2. create user 
app.post('/',async (req, res) => {
    const user = req.body
    console.log(user.data.name)
   
    const newUser = await Users.create({
        name: user.data.name,
        email: user.data.email,
        password: user.data.password,
    })
    res.json({data: newUser})
    // create user 
   /*  const user = await Users.create({
        email: email,
        password: password
    })
    res.json({data: user}) */
    
})
// 3. delete user
app.delete('/:id', validateToken,async (req,res) => {
    const id = req.params.id;
    await Users.destroy({
        where: {
            id: id
        }
    })
    res.json({
        message: "User deleted"
    })
})
// 4. update user
app.put('/:id', validateToken,async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log("hr", user)
    await Users.update(
        user,
        {
        where: {
            id: id
        }})
    res.send(user)
})
// 5. login
app.post('/login', async (req, res) => {
    const {email,password} = req.body
    console.log(req.body)
    const user = await Users.findOne({
        where:{
            email: email,
        }
    })
    console.log("user", user.dataValues)
    if(!user) return res.json({error:"email/password not found ! "});

    // check if password match with db password 
    
        if(!password){
            res.json({error:"email/password wrong !"})
        }else{
            let accessToken = sign({email: user.email, id:user.id},config.JWT_SECRET)
            // Allow us to access the accessToken from front-end
            res.json({ token: accessToken, email: user.email, id: user.id });
        }
    
  
})
// 6. Authenticate
app.get('/auth', validateToken, async (req, res) => {
        console.log(req.headers['accessToken'])
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    })
    console.log("user", user.dataValues)
    res.json(user)
    /* res.json({
        message: "You are authenticated"
    }) */
})

// 7. upload image
app.post('/upload/:id', upload, async (req, res) => {
    console.log(req.body)
    console.log(req.file)

    const file = req.file

    if(!file){
        res.json({error: "please upload file !"})
    }else{
        const user = await Users.findOne({
            where:{
                id: req.params.id
            }
        })
        user.picture_img = file.filename
        user.save()
        res.json({message: "upload success",
       
        file: `Images/${file.filename}`
        })
    }
})
module.exports = app;