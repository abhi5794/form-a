const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }

    },
    email:{
        type:String,
        unique: true,
        required : true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.virtual('formData',{
    ref:'FormData',
    localField:'_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async function(email,password){
    const user = await this.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User