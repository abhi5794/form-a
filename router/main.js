const express = require('express')
const FormData = require('../models/formdata')
const router = new express.Router()
const auth = require('../middleware/auth')
const cache = require('../middleware/cache')
const User = require('../models/user')

//go to range page
router.get('/data/range/:dateRange',auth ,(req,res)=>{
    dateRange = req.params.dateRange
    res.render('range')
})

//get data for range page
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
    if(pdfData===[]){
        res.redirect('')
    }else{
        dateRange=''//nullify the value
        res.send(formData[0].dataObject)
    }
    }
)

//new index page
router.get('', [auth,cache], async (req,res)=>{
    let curYear = (new Date()).getFullYear()
    filterData = await FormData.find({ // fetch files for the current year
        period:{
            $gte:new Date(curYear,01)
            ,$lte:new Date(curYear,12)
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
            if(pdfData===[]){
                res.redirect('')
            }else{
                res.send(numData.formData[0])
            }
        }
    }catch(e){
        res.status(500).send(e)
    }
})

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
