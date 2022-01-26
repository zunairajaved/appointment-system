var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/auth');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/profile',auth.varifyToken,userController.getProfile);
router.put('/update/profile',auth.varifyToken,userController.updateProfile);
router.get('/',userController.getUsers);
router.post('/add/days',auth.varifyToken,auth.verifyConsultant,userController.addUserDays);
router.get('/appointments',auth.varifyToken,userController.userAppointments);

module.exports = router;
