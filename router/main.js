const express = require('express')
const FormData = require('../models/formdata')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

//starter data
let dataSaved=[]

dataExcel = [{ 'UnitRefDate': 0,'BillofEntryNo': 1, 'CustomsStation': 2, 'Code': 3,
 'NameAddress':4, 'Others':5, 'DetailsB17':6,'Description':7, 'InvoiceNo':8, 'ProcCert':9,
  'UnitWeight':10, 'ValueReceipt':11, 'Duty':12, 'Registration':13, 'DateReceipt':14, 'DateRemoval':15,
'QuantityCleared':16, 'ValueRemoval':17, 'DutyInvolved':18,'Remarks':19,'PuposeofRemoval':20,'DateRemovals':21,
'QuantityRemoval':22,'ValueRemovals':23,'DutyRemovals':24,'DetailsDemovals':25,'PurposeReturns':26,'DateReturns':27,
'QuantityReturns':28,'ValueReturns':29,'DutyReturns':30,'DetailsReturns':31,'BalanceQuantity':32,'BalanceValue':33,'EndRemarks':34},
{ 'UnitRefDate': 0,'BillofEntryNo': 1, 'CustomsStation': 2, 'Code': 3,
 'NameAddress':4, 'Others':5, 'DetailsB17':6,'Description':7, 'InvoiceNo':8, 'ProcCert':9,
  'UnitWeight':10, 'ValueReceipt':11, 'Duty':12, 'Registration':13, 'DateReceipt':14, 'DateRemoval':15,
'QuantityCleared':16, 'ValueRemoval':17, 'DutyInvolved':18,'Remarks':19,'PuposeofRemoval':20,'DateRemovals':21,
'QuantityRemoval':22,'ValueRemovals':23,'DutyRemovals':24,'DetailsDemovals':25,'PurposeReturns':26,'DateReturns':27,
'QuantityReturns':28,'ValueReturns':29,'DutyReturns':30,'DetailsReturns':31,'BalanceQuantity':32,'BalanceValue':33,'EndRemarks':34}]

dataExcelJson = JSON.stringify(dataExcel)

//index page, this in turn calls GET/data
router.get('',auth,(req,res)=>{
    res.render('index',{
    })
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//GET/data
router.get('/data/fetch',auth , async (req,res)=>{
    try{//try will pass if the DB entry is created
        const user = await User.findById(req.user._id)
        const numData = await user.populate('formData').execPopulate()
        req.app.locals.formDataID = numData.formData[0]._id //store data id
        // res.send(JSON.stringify(numData.formData[0].dataObject))
        res.send(numData.formData[0].dataObject)
    }catch(e){//starter data
        res.send(JSON.stringify(dataExcel))
    }
})

//POST/save
router.post('/data/save', auth, async(req,res)=>{
    try{//check if user has pre-existing data
        if(!req.app.locals.formDataID){
            const formData = new FormData({
            dataObject:req.body,
            owner:req.user._id
        })
        formData.save()
        }
        else{//if not then overwrite the data from the page
            const numData = await FormData.findById(req.app.locals.formDataID.toString())
            numData.dataObject = req.body
            await numData.save()
        }
        res.send()
    }catch(e){
        res.status(500).send({error:e})
    }
})

//GET/pdf
router.get('/data/pdf',auth, async (req,res)=>{
    const user = await User.findById(req.user._id)
    const numData = await user.populate('formData').execPopulate()
    const saveData = numData.formData[0].dataObject
    res.render('pdf',{
        data: saveData
    },(err,html)=>{
        res.send(html)
    })
})

// router.get('/help',(req,res)=>{
//     res.render('help',{
//         title:'Help',
//         name:'abhi'
//     })
// })

// router.get('/about',(req,res)=>{
//     res.render('about',{
//         title:'about',
//         name:'abhi'
//     })
// })

module.exports = router
