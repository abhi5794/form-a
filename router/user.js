const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

//Login : GET/users/login
router.get('/users/login', (req,res)=>{
    res.render('login')
})

//Create : POST/users
router.post('/users', async(req,res)=>{
    const user = User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('Authorization','Bearer '+token,{
            httpOnly:true,
            expires : new Date(Date.now()+12*3600000)
        })
        // res.cookie('Authorization','Bearer '+token,{
        //     httpOnly:true, //for security, can be only access via web server
        //     expires: new Date(Date.now()+12*3600000)
        // })
        //res.status(201).send({user,token}) not used anywhere
        res.send('success')
    }catch(e){
        res.status(400).send(e)
    }
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//user profile : POST/users/me
router.post('/users/me',auth,async(req,res)=>{
    res.send(req.user)
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//login : POST/users/login
router.post('/users/login',express.urlencoded({extended:false}), async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        req.app.locals.UserVariable = user
        res.cookie('Authorization','Bearer '+token,{
            httpOnly:true,
            expires : new Date(Date.now()+12*3600000)
        })
        // res.cookie('Authorization','Bearer '+token,{
        //     httpOnly:true, //for security, can be only access via web server
        //     expires: new Date(Date.now()+12*3600000)
        // })
        //res.send({user,token})
        res.redirect('/')
    }catch(e){
        res.render('error',{
            'message':'404 : Unable to find user, please try again'
        })
    }
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//logout : POST/users/login
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

//logout all : POST/users/logoutAll
router.post('/users/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out of all accounts')
    }catch(e){
        res.status(500).send()
    }
})

//delete user : DELETE/users/me
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

//404 page
// router.get('*',(req,res)=>{
//     res.send({error:'Page not found'})
// })

module.exports = router