const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    dataObject:{
        type:Object,
        required:true
    }
    // ,
    // owner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'User'
    // }
})

const FormData = mongoose.model('FormData',DataSchema)

module.exports = FormData