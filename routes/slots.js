var express = require('express');
var router = express.Router();
const Slot = require('../controllers/SlotController');
const auth = require('../middleware/auth');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/create', Slot.addSlot);
router.get('/', Slot.getAllSlots);
router.put('/update/:id',auth.varifyToken,auth.verifyConsultant, Slot.updateSlot);
router.delete('/delete/:id',auth.varifyToken,auth.verifyConsultant,Slot.deleteSlot);

module.exports = router;
