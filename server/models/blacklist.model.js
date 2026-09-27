const mongoose = require("mongoose")

const blacklistschema= new mongoose.Schema({
    token:{
        type:String,
        required:true
    }},{timestamps:true}
)

const blacklistmodel=mongoose.model("blacklists",blacklistschema)

module.exports=blacklistmodel