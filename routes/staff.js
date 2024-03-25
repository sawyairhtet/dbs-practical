const express = require('express');
const staffModel = require('../models/staff');
const {RAISE_EXCEPTION, EMPTY_RESULT_ERROR } = require('../errors');

const router = express.Router();
 
router.post('/transferStaff', (req, res) => {
    const staffNumber = req.body.staffNumber;
    const departmentCode = req.body.departmentCode;
    
    return staffModel.transferStaff(staffNumber, departmentCode)
        .then(function(result) {
            return res.sendStatus(200);
        })
        .catch(function(error){
            console.error(error)
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            }            
            if (error instanceof RAISE_EXCEPTION) {
                return res.status(400).json({ error: error.message });
            } 
            console.error(error);
            return res.status(500).send('unknown error');
        });
});

module.exports = router;