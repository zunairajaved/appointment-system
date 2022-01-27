const Day = require('../models').Day;
const Slot = require('../models').Slot;
const { validationResult } = require('express-validator/check');

module.exports = {
    addDays : (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors:errors.array()});  
        } 
        Day.create({
            name:req.body.name
        }).then(day => {
            res.status(200).send(day.toJSON);
        }).catch(err =>  {res.status(500).send({message:err.message});
    });
    },
    updateDay : (req,res) => {
        Day.update({name:req.body.name},
        {where:{id:req.params.id}},{new:true})
        .then(() => {
                res.status(200).send({message:'updated'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    deleteDay : (req,res) =>{
        Day.destroy({where:{id:req.params.id}}, {
        })
        .then(() => {
                res.status(200).send({message:'deleted'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    getAllDays :  (req,res) => {
              Day.findAll({
                include: [{
                    model:Slot,
                    as: 'slots',
                  }],
            })
            .then((days) => {
                res.status(200).send(days.toJSON);
            })
            .catch(err => {res.status(500).send({message:err.message});
        });
        },

}