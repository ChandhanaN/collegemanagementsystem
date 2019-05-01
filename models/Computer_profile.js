const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "Computers"
    },
    first_name:{
        type:String,
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
    // dob:{
    //     type: Date,
    //     required: true
    // },
    gender:{
        type: String,
        required: true
    },
    phn_no:{
        type: String,
        required: true
    },
    marital_status:{
        type: String,
        required: true
    },
    empID:{
        type: String,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
    qualification:{
        type: [String],
        required: true
    },
    experiance:{
        type: String,
    },
    Address:{
        type: String,
        required: true
    }
});
module.exports = Profile = mongoose.model("comp_prof", ProfileSchema);