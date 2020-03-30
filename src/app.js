const path = require('path')
const express = require('express')
const fs = require('fs')
const hbs = require('hbs') // this is for using partials
bodyParser = require('body-parser') //to parse incoming request
const pdfGen = require('./utils/pdfGen')

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3001

app.set('view engine', 'hbs') // to be added for hbs
app.set('views', viewPath) //for hbs views folder, since it is not in the default views folder
hbs.registerPartials(partialsPath)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(publicDirectoryPath))

dataExcel = [{ 'BillofEntryNo': 'Test', 'CustomsStation': 2001, 'Code': 2000,
 'NameAddress':2, 'Others':3, 'DetailsB17':4,'Description':5, 'InvoiceNo':6, 'ProcCert':7,
  'UnitWeight':8, 'Value':9, 'Duty':10, 'Registration':11, 'DateReceipt':12 },
  { 'BillofEntryNo': 'Test2', 'CustomsStation': 2001, 'Code': 2000,
  'NameAddress':2, 'Others':3, 'DetailsB17':4,'Description':5, 'InvoiceNo':6, 'ProcCert':7,
   'UnitWeight':8, 'Value':9, 'Duty':10, 'Registration':11, 'DateReceipt':12 }]

dataExcelJson = JSON.stringify(dataExcel)
app.get('', (req,res)=>{
    res.render('index',{
        title:'Form - A',
    })
})

app.get('/data',(req,res)=>{
    res.send(dataExcelJson)
})

app.post('/save', async(req,res)=>{
    dataSaved = req.body
    //console.log(req.body)

})

app.get('/pdf', (req,res)=>{
    res.render('pdf',{
        data: dataSaved,
    },(err,html)=>{
        res.send(html)
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'abhi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'abhi'
    })
})

app.get('/weather', (req,res)=>{

    
})

app.get('*', (req,res)=>{
    res.send('404') //
})


app.listen(port, ()=>{
    console.log('Running on '+port)
})