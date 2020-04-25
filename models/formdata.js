const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    dataObject:{
        type:Object
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    period:{
        type:Date,
    },
    periodString:{
        type:String
    }

})

DataSchema.index({owner:1, period:1})//one user one period

const FormData = mongoose.model('FormData',DataSchema)

module.exports = FormData