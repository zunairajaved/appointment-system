const User = require('../models').User;
const Day = require('../models').Day;
const Appointment = require('../models').Appointment;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require('../config');
const { validationResult } = require('express-validator/check');

 module.exports = {
    signup : (req, res) => {
            const errors = validationResult(req);
            console.log(errors);
            if(!errors.isEmpty()){
                res.status(422).json({errors:errors.array()});  
            } 
            User.create({ 
                fullName : req.body.fullName,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 8),
                role : req.body.role,
            }).then(user => {
                    res.status(200).send(user.toJSON());
              }).catch(err => {
                  res.status(500).send({message:err.errors.message})
              });
    },
    signin : (req, res) => {
        User.findOne({where:{email:req.body.email}})
        .then(user => {
            if(!user){
                return res.status(404).send({message:"user not found"})
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passwordIsValid){
                return res.status(401).send({message:"Invalid Password"});
            }
            var token = jwt.sign({id:user.id},config.secretKey,{
                expiresIn:86400 // 24hours
            });
            res.status(200).send({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                roles: user.role,
                accessToken: token
              });
        }).catch(err => {
            res.status(500).send({message:err.message});
        });
    },
    getProfile :  (req,res) => {
        User.findByPk(req.userId,{
        })
        .then((user) => {
            res.status(200).send(user.toJSON());
        }).catch(err => {
            res.status(500).send({message:err.message});
        });
    },
    updateProfile : (req,res) =>{
        User.update( {
            fullName:req.body.fullName,
            phone:req.body.phone
        },{where:{
            id:req.userId}},{new:true})
        .then(() => {
                res.status(200).send({message:'profile updated'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    })
},
    getUsers :  (req,res) => {
         User.findAll(req.query)
        .then((user) => {
            res.status(200).send(user.toJSON);
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
   addUserDays: async (req,res) => {
       var user =  await User.findByPk(req.userId);
       var day = await Day.findByPk(req.body.id);
            await user.addDay(day);
        return res.status(200).send({message:'User days added successfully'});
    },
    userAppointments : (req,res) =>
    {
          User.findByPk(req.userId,
        {  attributes: ['fullName', 'email'],
        include: [{
            model: Appointment,
            as:'appointments'
           }]
        }
        ).then(user =>{
              return res.status(200).send(user);
            }).catch(err => {res.status(500).send({message:err.message});
        });
    },

   
}