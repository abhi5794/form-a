const path = require('path')
const express = require('express')
const hbs = require('hbs') // this is for using partials
bodyParser = require('body-parser') //to parse incoming request
const cookieParser = require('cookie-parser')
const session = require('express-session')
//To-do

// add additional validation to the new entry creation FM
// trim code
// set up error page
// make password mandatory 
// create test scripts
// check if etag is required

require('../db/mongoose')

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT // get the env var when running in heroku

app.set('view engine', 'hbs') // to be added for hbs
app.set('views', viewPath) //for hbs views folder, since it is not in the default views folder
hbs.registerPartials(partialsPath)

// app.disable('etag')

app.use(bodyParser.json()) // helps to parseinput to express as json
app.use(bodyParser.urlencoded({extended:false})) //helps to parse input URL encoded data
app.set('trust proxy', 1)
// app.use(session({
//     secret:'thisis',
//     resave:'false',
//     saveUninitialized:true,
//     cookie:{
//         secure:true,
//         expires: new Date(Date.now()+12*3600000)
//     }
// }))
app.use(cookieParser()) //to parse cookie information, should be above routes


const mainRouter = require('../router/main')
const userRouter = require('../router/user')
app.use(mainRouter)
app.use(userRouter)

// app.get('/*', (req,res,next)=>{
//     res.setHeader('Last-Modified',(new Date()).toUTCString())
//     next()
// })

app.use(express.static(publicDirectoryPath))

//testing

const FormData = require('../models/formdata')
const User = require('../models/user')



// functionName()

app.listen(port, ()=>{
    console.log('Running on '+port)
})