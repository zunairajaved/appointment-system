const Slot = require('../models').Slot;

module.exports = {
    addSlot :  (req,res) => {
         Slot.create({
            dayId:req.body.dayId,
            startTime:req.body.startTime,
            endTime:req.body.endTime
        }).then(slot => {
            res.status(200).send(slot.toJSON());
        }).catch(err =>  {res.status(500).send({message:err.message});
    });
    },
    updateSlot :  (req,res) => {
         Slot.update( {
            startTime:req.body.startTime,
            endTime:req.body.endTime
        },{where:{id:req.params.id}},
        {new:true})
        .then(() => {
                res.status(200).send({message:'updated'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    deleteSlot : (req,res) =>{
         Slot.destroy({where:{id:req.params.id}}, {
        })
        .then(() => {
                res.status(200).send({message:'deleted'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    getAllSlots :  (req,res) => {
         Slot.findAll(req.query)
            .then((slots) => {
                res.status(200).send(slots.toJSON());
            })
            .catch(err => {res.status(500).send({message:err.message});
        });
        },

}