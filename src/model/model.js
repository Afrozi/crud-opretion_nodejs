const mongoose = require('mongoose');
const playlist = mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
    },
});

const objdata = new mongoose.model('dispalydata',playlist);
module.exports = objdata;