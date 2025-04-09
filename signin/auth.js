const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');

const router = express.Router();

router.post('/register',async(req, res) => {
    const{firstname,lastname,email,password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
    const query = 'INSERT INTO users(firstname,lastname,email,password)VALUES(?, ?, ?, ?)';
    db.query(query,[firstname,lastname,email,hashedPassword],(err,result) => {
        if(err) throw err;
        res.status(201).send('Successfully');

    });   }catch (error){
        res.status(500).send('Error');

    }

});



//user login
router.post('/login',(req, res) => {
    const {email, password } =req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async(err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch){
                res.status(200).send('login successfully');

            }else{
                res.status(401).send('invalid credentails');
            } 

            }else{
                res.status(404).send('user not found');
            }
        
    })
})
module.export = router;