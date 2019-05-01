const mongoose = require('mongoose');
//schema means document structure ani.. register chesthunnam ga.. dhani structure edhi
const Schema = mongoose.Schema;
//PersonSchema means adhi na shcema name
const PersonSchema = new Schema({
    //dheni names form lo manam ah input field ki esthunna names match avvali

    name:{
        //name field collect chesthunna, dhani data string type lo untundhi.. and adhi complsaryga
        //ah field lo value evvali.. remaining kuda anthe../
        //last lo ah date use cheyachu cheyakapovachu
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
//endhaka module.exports = router; ani rasam kadha edhi anthe.. kapothe ekkada.. person schema ni 
//export chesthunnam.. "Computers" ani undhi kadha.. adhi na collection name
//ok..???

//ekkadidhaka chey. student module lo.. oka registration form chey.. max anni textboxes ae vadu.. dob
// thesey.. ok
//HA
//oka model create chey same elane ok.. routes lo basic routes set cheye.. incase emina doubt osthe.. wait
//github loki clone chestha.. use chesko code ni

module.exports = Person = mongoose.model('Computers', PersonSchema);