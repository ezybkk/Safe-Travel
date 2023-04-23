const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const hotlineSchema = new Schema({
    
    Location: {
        type: String,
        required:true,

    },
    BFP: {
        type: String,
        required: true,
    },
    Police: {
        type: String,
        required: true,
    },
    Hospital: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Hotline', hotlineSchema);