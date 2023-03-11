const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const restaurantSchema = new Schema({
    
    Location: {
        type: String,
        required:true,

    },
    Name: {
        type: String,
        required: true,
    },
    Details: {
        type: String,
        required: true,
    },
    Link: {
        type: String,
        required: true,
    },
    Comments: {
        type: String,
        required: true,
        value: []
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);