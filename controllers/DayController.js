const Day = require('../models').Day;
const Slot = require('../models').Slot;

module.exports = {
    addDays : (req,res) => {
        Day.create({
            name:req.body.name
        }).then(day => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(day);
        }).catch(err =>  {res.status(500).send({message:err.message});
    });
    },
    updateDay : (req,res) => {
        Day.update({name:req.body.name},
        {where:{id:req.params.id}},{new:true})
        .then((day) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({message:'updated'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    deleteDay : (req,res) =>{
        Day.destroy({where:{id:req.params.id}}, {
        })
        .then((day) => {
            res.setHeader('Content-Type', 'application/json');
                res.status(200).send({message:'deleted'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    getAllDays : async (req,res) => {
             await Day.findAll({
                include: [{
                    model:Slot,
                    as: 'slots',
                  }],
            })
            .then((days) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(days);
            })
            .catch(err => {res.status(500).send({message:err.message});
        });
        },

}