const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');

const router = express.Router();
// register a new user
router.post('/ workers register',async(req, res) => {
    const{firstname,lastname,email,password,experience} = req.body;
    try{
        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // insert the new user into the database
    const query = 'INSERT INTO babysitter(id,firstname,lastname,email,password,experience)VALUES(?, ?, ?, ?, ?)';
    db.query(query,[Id,firstname,lastname,email,hashedPassword,experience],(err,result) => {
        if(err) throw err;
        res.status(201).send('Successfully');

    });   }catch (error){
        res.status(500).send('Error');

    }

});



//user login
router.post('/login',(req, res) => {
    const {email, password } =req.body;
    // find the user by email
    const query = 'SELECT * FROM babysitter WHERE email = ?';
    db.query(query, [email], async(err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            //compare the hashed password
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