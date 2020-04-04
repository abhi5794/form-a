const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/users/login', (req,res)=>{
    res.render('login')
})

//Create 
router.post('/users', async(req,res)=>{
    const user = User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('Authorization','Bearer '+token)
        // res.cookie('Authorization','Bearer '+token,{
        //     httpOnly:true, //for security, can be only access via web server
        //     expires: new Date(Date.now()+12*3600000)
        // })
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//user profile
router.post('/users/me',auth,async(req,res)=>{
    res.send(req.user)
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//login
router.post('/users/login',express.urlencoded({extended:false}), async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        req.app.locals.UserVariable = user
        res.cookie('Authorization','Bearer '+token)
        // res.cookie('Authorization','Bearer '+token,{
        //     httpOnly:true, //for security, can be only access via web server
        //     expires: new Date(Date.now()+12*3600000)
        // })
        //res.redirect('/')
        res.send({user,token})
    }catch(e){
        res.status(400).send(req.body.email,req.body.password)
    }
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//logout
router.post('/users/logout', auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logged out')
    }catch(e){
        res.status(500).send()
    }
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//logout all
router.post('/users/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out of all accounts')
    }catch(e){
        res.status(500).send()
    }
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

router.delete('/users/me',auth , async (req, res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

router.get('*',(req,res)=>{
    res.send({error:'Page not found'})
})

module.exports = router