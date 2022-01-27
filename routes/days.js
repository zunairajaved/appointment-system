var express = require('express');
var router = express.Router();
const Day = require('../controllers/DayController');
const auth = require('../middleware/auth');
const check = require('../middleware/validation');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/create',check.dayValidate(), Day.addDays);
router.get('/', Day.getAllDays);
router.put('/update/:id', Day.updateDay);
router.delete('/delete/:id', Day.deleteDay);

module.exports = router;
