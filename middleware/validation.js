const { check } = require('express-validator/check');
   exports.userValidate = () => {
       return [ 
          check('fullName', 'name is required').exists(),
          check('email','Email must be an Email').isEmail(),
          check('password','password must be at least 5 chars long').isLength({ min: 5 }),
         ]   
    };

    exports.dayValidate = () => {
        return [ 
           check('name', 'name is required').exists(),
          ]   
     };

     exports.slotValidate = () => {
        return [ 
           check('startTime', 'startTime is required').exists(),
           check('endTime', 'startTime is required').exists(),
          ]   
     };