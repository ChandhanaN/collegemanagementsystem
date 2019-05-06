const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    father_name:{
        type: String,
        required: true
    },
    gender:{
        type:[],
        required: true
    },
    dob:{
        type:Date,
        default: Date.now,
        required: true
    },
    phn_no:{
        type: String,
        required: true
    },
    adhar:{
        type: String,
        required: true
    },
    caste:{
        type: [],
        required: true
    },
    marital:{
        type: [],
        required: true
    },
    email:{
        type: String,
        required: true
    },
    stdid:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    }
});

module.exports = Student = mongoose.model('compStudent',StudentSchema);
