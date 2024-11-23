const mongoose =require('mongoose')


const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, 
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
            'Please enter a valid email address', 
        ],
    },
})

const User=mongoose.model('User',userSchema)

module.exports=User