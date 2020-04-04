const path = require('path')
const express = require('express')
const hbs = require('hbs') // this is for using partials
bodyParser = require('body-parser') //to parse incoming request
const cookieParser = require('cookie-parser')
const session = require('express-session')

require('../db/mongoose')

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs') // to be added for hbs
app.set('views', viewPath) //for hbs views folder, since it is not in the default views folder
hbs.registerPartials(partialsPath)

app.use(bodyParser.json()) // helps to parseinput to express as json
app.use(bodyParser.urlencoded({extended:false})) //helps to parse input URL encoded data
app.set('trust proxy', 1)
app.use(session({
    secret: 'some',
    resave:'false',
    saveUninitialized:true,
    cookie:{
        secure:true,
        httpOnly:true, //for security, can be only access via web server
        expires: new Date(Date.now()+12*3600000)
    }

}))
app.use(cookieParser()) //to parse cookie information
app.use(express.static(publicDirectoryPath))

const mainRouter = require('../router/main')
const userRouter = require('../router/user')
app.use(mainRouter)
app.use(userRouter)

app.listen(port, ()=>{
    console.log('Running on '+port)
})