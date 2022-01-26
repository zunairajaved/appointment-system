var express = require('express');
var router = express.Router();
const Day = require('../controllers/DayController');
const auth = require('../middleware/auth');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/create', Day.addDays);
router.get('/', Day.getAllDays);
router.put('/update/:id', Day.updateDay);
router.delete('/delete/:id', Day.deleteDay);

module.exports = router;
