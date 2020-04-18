const express = require('express')
const FormData = require('../models/formdata')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

router.get('/data/range/:dateRange',auth ,(req,res)=>{
    dateRange = req.params.dateRange
    res.render('range')
})
router.get('/data/rangeGet',auth, async(req,res)=>{
    dateRange = dateRange.split('+').map((x)=>parseInt(x))
    let startPeriod = new Date(dateRange[1],dateRange[0])
    let endPeriod = new Date(dateRange[3],dateRange[2])
    formData = await FormData.aggregate([
        {
            $match:{
                owner: req.user._id,
                period:{
                    $gte:startPeriod
                    ,$lte:endPeriod
                }
            }
        },
        {
            $unwind:'$dataObject'
        },
        {
            $group:{
                _id:null,
                dataObject:{$push:'$dataObject'}
            }
        }
    ])
    pdfData=formData[0].dataObject
    dateRange=''//nullify the value
    res.send(formData[0].dataObject)
    }
)

//new index page
router.get('', auth, async (req,res)=>{
    filterData = await FormData.find({ // fetch files for the current year
        period:{
            $gte:'2020-01-31'
            ,$lte:new Date(new Date('2020-12-31').setHours(24,00,00))
        }
        ,owner:req.user._id
    }).sort({period:-1})

    res.render('landing',{
        data: await filterData
    })
},(error, req, res, next)=>{
    res.status(400).send({error:error})
})

//load main page based on the date entered
router.get('/data/fetch/link/:date',auth, async(req,res)=>{
    try{
        res.render('main',{
            date:req.params.date
        })
    }catch(e){

    }
})

//GET data by date
router.get('/data/fetch/:date',auth, async(req,res)=>{
    try{
        let dateParsed = req.params.date.split(',').map((x)=>parseInt(x))
        let period = new Date(dateParsed[0],dateParsed[1]).toISOString()
        period = period.replace('Z','')+'+00:00'
        const user = await User.findById(req.user._id)
        const numData = await user.populate({
            path:'formData',
            match:{
                period
            }
        }).execPopulate()
        if(await numData.formData.length ===0){
            res.send('no data found')
        }else{
            pdfData = numData.formData[0].dataObject //PDF
            res.send(numData.formData[0])
        }
    }catch(e){
        res.status(500).send(e)
    }
})

//GET/data
// router.get('/data/fetch',auth , async (req,res)=>{
//     try{//try will pass if the DB entry is created
//         const user = await User.findById(req.user._id)
//         const numData = await user.populate('formData').execPopulate()
//         req.app.locals.formDataID = numData.formData[0]._id //store data id
//         // res.send(JSON.stringify(numData.formData[0].dataObject))
//         res.send(numData.formData[0].dataObject)
//     }catch(e){//starter data
//         res.send(dataExcel)
//     }
// })

//create a new file for the period
router.post('/data/save/new',auth, async(req,res)=>{
    try{
        const formData = new FormData({
            dataObject:req.body.dataObject,
            owner:req.user._id,
            periodString:req.body.periodString,
            period:req.body.period
        })
        pdfData = formData.dataObject
        await formData.save()
        res.send()
    }catch(e){
        res.status(500)
    }
})

//save to specific dataForm ID
router.patch('/data/save/:id',auth,async(req,res)=>{
    try{
        const formData = await FormData.findOne({_id:req.params.id})
        formData.dataObject = req.body
        pdfData = req.body //PDF
        await formData.save()
        res.send()
    }catch(e){
        res.status(500)
    }
})

//POST/save
// router.post('/data/save', auth, async(req,res)=>{
//     try{//check if user has pre-existing data
//         if(!req.app.locals.formDataID){
//             const formData = new FormData({
//             dataObject:req.body,
//             owner:req.user._id
//         })
//         await formData.save()
//         }
//         else{//if not then overwrite the data from the page
//             const numData = await FormData.findById(req.app.locals.formDataID.toString())
//             numData.dataObject = req.body
//             await numData.save()
//         }
//         res.send()
//     }catch(e){
//         res.status(500).send({error:e})
//     }
// })

//GET/pdf
router.get('/data/pdf',auth, async (req,res)=>{
    res.render('pdf',{
        data:pdfData,
        name:req.user.name
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
