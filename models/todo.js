const mongoose=require('mongoose')

const todoSchema=mongoose.Schema({
    todo:{type:String},
    date:{type:Date,default:new Date()},
    status:{type:Boolean,default:false},
},{timestamps:true})

module.exports=mongoose.model("todo",todoSchema)