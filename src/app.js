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

dataExcel = [{ 'BillofEntryNo': 1, 'CustomsStation': 2, 'Code': 3,
 'NameAddress':4, 'Others':5, 'DetailsB17':6,'Description':7, 'InvoiceNo':8, 'ProcCert':9,
  'UnitWeight':10, 'ValueReceipt':11, 'Duty':12, 'Registration':13, 'DateReceipt':14, 'DateRemoval':15,
'QuantityCleared':16, 'ValueRemoval':17, 'DutyInvolved':18,'Remarks':19,'PuposeofRemoval':20,'DateRemovals':21,
'QuantityRemoval':22,'ValueRemovals':23,'DutyRemovals':24,'DetailsDemovals':25,'PurposeReturns':26,'DateReturns':27,
'QuantityReturns':28,'ValueReturns':29,'DutyReturns':30,'DetailsReturns':31,'BalanceQuantity':32,'BalanceValue':33,'EndRemarks':34},
{ 'BillofEntryNo': 1, 'CustomsStation': 2, 'Code': 3,
 'NameAddress':4, 'Others':5, 'DetailsB17':6,'Description':7, 'InvoiceNo':8, 'ProcCert':9,
  'UnitWeight':10, 'ValueReceipt':11, 'Duty':12, 'Registration':13, 'DateReceipt':14, 'DateRemoval':15,
'QuantityCleared':16, 'ValueRemoval':17, 'DutyInvolved':18,'Remarks':19,'PuposeofRemoval':20,'DateRemovals':21,
'QuantityRemoval':22,'ValueRemovals':23,'DutyRemovals':24,'DetailsDemovals':25,'PurposeReturns':26,'DateReturns':27,
'QuantityReturns':28,'ValueReturns':29,'DutyReturns':30,'DetailsReturns':31,'BalanceQuantity':32,'BalanceValue':33,'EndRemarks':34}]

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
    console.log(req.body)

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