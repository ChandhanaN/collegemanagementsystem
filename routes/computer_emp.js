const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');
const Person = require('../models/Computer');
const key = require('../setup/myurl');
const path = require('path');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const config = require('../strategies/jsonstrategy');
const Profile = require('../models/Computer_profile');

router.post('/register', (req, res) =>{
    //register chese mundhu ah name tho evarina person unnara ani check cheyali.. coz 2persons ki same email evvlaem kadha
    Person.findOne({email: req.body.email})
        .then(person =>{
            if(person){
                return res.status(400).json({emailerror:'person existed'});
            }else{
                const newPerson = new Person({ 
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                //encrypt password using bcrypt
                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newPerson.password, salt, (err, hash) =>{
                        if(err) throw err;
                        newPerson.password = hash; //edhi mrng vadu cheppindhi.. passwords anni encry
                        newPerson.save()
                            .then(person => res.json(person))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
        .catch(err => console.log(err));
});

router.post('/login', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
 Person.findOne({email})
        .then(person =>{
            if(!person){
                return res.status(404).json({emailerror:'user not found'});
            }
            else{
                bcrypt.compare(password, person.password)
                    .then(isCorrect =>{
                        if(isCorrect){
                            // res.json({success:'login success'});
                            const payload = {
                                id: person.id,
                                email:person.email,
                                name:person.name
                            };
                         var token =  jwt.sign(
                               payload,
                               key.secret,
                               {
                                   expiresIn: 3600
                               },
                           );
                        res.cookie('jwt', token,{httpOnly: true});
                        res.redirect('/prof_comp');
                        }
                        else{
                            res.status(500).json({error:'internal error caused by bcrypt'});
                        }
                    })
                    .catch(err => console.log(err));
            }
        });
});


router.get('/prof_comp', passport.authenticate("jwt", {session: false}), (req, res) =>{
    const token = req.cookies.jwt;
    try{
         const dec = jwt.decode(token, key.secret)
        res.render('employee.ejs');
    }    
    catch(err){
        res.send('Error in fetching token');
    }
    
})

router.get('/add_comp_prof', passport.authenticate("jwt", {session: false}), (req, res) =>{
    const token = req.cookies.jwt;
    try{
        const dec = jwt.decode(token, key.secret)
    res.render('add_comp_prof.ejs');
    }
    catch(err){
        res.send('Again error in fetching token');
    }
        
})

router.post('/add_comp_profile', (req, res) =>{
    const token = req.cookies.jwt;
    const dec = jwt.decode(token, key.secret);
    Profile.findOne({id: dec.id})
        .then(profile =>{
            if(profile){
                res.send('You had a profile, please go for update');
            }
            else{
                const newProfile = new Profile({
                    user: dec.id,
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    father_name : req.body.father_name,
                    gender: req.body.gender,
                    // dob: req.body.dob,
                    marital_status: req.body.marital_status,
                    phn_no : req.body.phn_no,
                    empID: req.body.empID,
                    dept: req.body.dept,
                    qualification : req.body.qualification,
                    experiance : req.body.experiance,
                    Address : req.body.experiance
                })
                newProfile.save()
                    .then(profile => res.send(profile))
                    .catch(err => res.send(err))
            }
        })
        .catch(err => console.log(err))
    
});

router.get('/view_prof', passport.authenticate('jwt', {session:true}), (req, res) =>{
    const token = req.cookies.jwt;
    const dec = jwt.decode(token, key.secret);
    Profile.findOne({id: req.user.id})
        .then(profile =>{
            if(profile){
                res.json(profile)
            }else{
                res.send('person dont have profile')
            }
        })
        .catch(err => res.send(err))

})
module.exports = router;