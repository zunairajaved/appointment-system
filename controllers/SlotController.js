const Slot = require('../models').Slot;

module.exports = {
    addSlot : async (req,res) => {
        await Slot.create({
            dayId:req.body.dayId,
            startTime:req.body.startTime,
            endTime:req.body.endTime
        }).then(slot => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(slot);
        }).catch(err =>  {res.status(500).send({message:err.message});
    });
    },
    updateSlot : async (req,res) => {
        await Slot.update( {
            startTime:req.body.startTime,
            endTime:req.body.endTime
        },{where:{id:req.params.id}},
        {new:true})
        .then((slot) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({message:'updated'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    deleteSlot : async (req,res) =>{
        await Slot.destroy({where:{id:req.params.id}}, {
        })
        .then((slot) => {
            res.setHeader('Content-Type', 'application/json');
                res.status(200).send({message:'deleted'});
        })
        .catch(err => {res.status(500).send({message:err.message});
    });
    },
    getAllSlots : async (req,res) => {
        await Slot.findAll(req.query)
            .then((slots) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(slots);
            })
            .catch(err => {res.status(500).send({message:err.message});
        });
        },

}