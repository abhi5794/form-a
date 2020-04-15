const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    dataObject:{
        type:Object
        // ,
        // required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        // ,
        // required:true,
        ref:'User'
    },
    period:{
        type:Date,
    },
    periodString:{
        type:String
    }
    // newEntry:{
    //     type:Boolean,
    //     default:false
    // }

})

DataSchema.index({owner:1, period:1})//one user one period

const FormData = mongoose.model('FormData',DataSchema)

module.exports = FormData