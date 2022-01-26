const jwt = require("jsonwebtoken");
const config = require('../config');
const User = require('../models').User;
module.exports = {
varifyToken : (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message:"No token provided!"
        });
    }
    jwt.verify(token,config.secretKey,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
},
verifyAdmin : (req,res,next)=>{
    User.findByPk(req.userId)
    .then(user =>{
        if(user.role == 'admin'){
            return next();
        }
        else {
            return res.status(403).send({
                message:"You are not autorized to perform this   operation!!"
            });
        }
    });
},

verifyConsultant : (req,res,next) =>{
    User.findByPk(req.userId)
    .then(user =>{
        if(user.role == 'consultant'){
            return next();
        }
        else {
            return res.status(403).send({
                message:"You are not autorized to perform this   operation!!"
            });
        }
    });
}
}


