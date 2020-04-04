const express = require('express')
const FormData = require('../models/formdata')
const router = new express.Router()
const auth = require('../middleware/auth')

let dataSaved=[]

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

router.post('/test',async (req,res)=>{
    const formData = FormData(req.body)
    try{
        await formData.save()
        res.status(200).send(formData)
    }catch(e){
        res.status(400).send(e)
    }
})

dataExcelJson = JSON.stringify(dataExcel)
router.get('',auth,(req,res)=>{
    res.render('index',{
        title:'Form - A',
    })
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

router.get('/data',auth ,(req,res)=>{
    //console.log(req.app.locals.UserVariable)
    res.send(dataExcelJson)
})

router.post('/save', async(req,res)=>{
    dataSaved = req.body
    console.log(req.body)

})

router.get('/pdf', (req,res)=>{
    if(dataSaved.length===0){
        res.redirect('/')
    }
    res.render('pdf',{
        data: dataSaved,
    },(err,html)=>{
        res.send(html)
    })
})

router.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'abhi'
    })
})

router.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'abhi'
    })
})

// router.get('*', (req,res)=>{
//     res.send('404 from main') //
// })

module.exports = router
