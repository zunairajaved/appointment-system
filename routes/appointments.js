var express = require('express');
var router = express.Router();
const Appoint = require('../controllers/AppointmentController');
const auth = require('../middleware/auth');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/create',auth.varifyToken, Appoint.createAppointment);
// router.get('/', Day.getAllDays);
router.put('/update/:id',auth.varifyToken, Appoint.updateStatus);
// router.delete('/delete/:id', Day.deleteDay);

module.exports = router;
