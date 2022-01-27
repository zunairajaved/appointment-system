const Appointment = require('../models').Appointment;
const User = require('../models').User;
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {
    createAppointment:  (req,res) =>{
      Appointment.create({
        dayId:req.body.dayId,
        slotId:req.body.slotId,
        userId:req.userId,
        consultantId:req.body.consultantId,
        status:req.body.status,
        description:req.body.description
      }).then(appointment => {
        //   let user =  User.findByPk(req.userId);
        //   let consultant =  User.findByPk(appointment.consultantId);
        //   let userOptions = {
        //     from: 'zunaira0107@gmail.com',
        //     to: user.email,
        //     subject: 'Scheduled Appoinment',
        //     text: 'Hi there. your appoinment is scheduled '
        //   };
        //   let consultantOptions = {
        //     from: 'zunaira0107@gmail.com',
        //     to: consultant.email,
        //     subject: 'Scheduled Appoinment',
        //     text: 'Hi there. your have a scheduled appoitment'
        //   };
        //  config.transporter.sendMail(userOptions);
        //  config.transporter.sendMail(consultantOptions)
        res.status(200).send().json(appointment);
   }).catch(err => {
       res.status(500).send({message:err.message})
      });
    },
    updateStatus :  (req,res) =>{
       Appointment.update({
        status:req.body.status
      },{where : {id:req.param.id , userId:req.userId}}).then(status =>{
                res.status(200).send({message:'status updated'});
        })
        .catch(err => {res.status(500).send({message:err.message});
      });
    },
}