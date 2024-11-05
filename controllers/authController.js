const db = require('../config/db')
const bcrypt = require('bcryptjs')

//user registration function/logic
exports.registerUser = async (req, res) => {
    const {name, email, password } = req.body;

    try{
        //check if user exists in database
        const[rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length > 0){
            return res.status(400).json({ message: 'user already exist'})
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Insert record into the database
        await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
            name, 
            password,
            hashedPassword
        ]);

        res.status(201).json({ message: 'User registered successfully.'})
    } catch(error){
        res.status(500).json({ message: 'An error occured.', error})
    }
}

