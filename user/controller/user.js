const User= require('../model');
//const errors = require('../util/errors');

const getUsers=()=>{
    User.find((err,res)=>{
        if(err){
            console.log(err);
            return 500;
        }
        else{
            return res;
        }
    })
}
const getUsersById=(id)=>{
    User.findOne({_id:id}, (err,res)=>{
        if(err){
            console.log(err);
            return 500;
        }
        else{
            return res;
        }
    })
}

const createUser=(data)=>{
    const {user, role } = req.headers;
    const data1 = new User({_id: user, name:data.name, contactNo: data.contactNo, emails:data.emails, resumes: data.resumes , coverLetters: data.coverLetters, city: data.city, state: data.state, country: data.country, zip: data.zip, jobPreferences: data.jobPreferences})
    data1.save( (err,res)=>{
        if(err){
            console.log(err);
            return 500;
        }
        else{
            return res;
        }
    })
}

const updateUserById=(id)=>{
    const {user, role } = req.headers;
    User.findOneAndUpdate({_id:id}, { name:data.name, contactNo: data.contactNo, emails:data.emails, resumes: data.resumes , coverLetters: data.coverLetters, city: data.city, state: data.state, country: data.country, zip: data.zip, jobPreferences: data.jobPreferences},(err,res)=>{
        if(err){
            console.log(err);
            return 500;
        }
        else{
            return res;
        }
    })
}