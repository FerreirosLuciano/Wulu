const mysqlConnection = require('../database/db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports = {

        signup: async (req, res) => {
            try{
                const {dni, nombre, apellido, telefono, mail, contraseña} = req.body
                console.log("Contraseña mi rey", contraseña)
                
                let contraseñabcrypt = await bcrypt.hash(contraseña);

                console.log(contraseñabcrypt)
                
                const users = {dni, nombre, apellido, telefono, mail, contraseñabcrypt}
                const result = await mysqlConnection.query('INSERT INTO users SET ?', users);
                
                console.log("ACA SALE EL RSULTADO PA", result.values)
                
                const token = jwt.sign({ mail: users.mail}, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN, });

                res.status(200).json({
                    status: "success",
                    message: "User Created",
                    token
                })
            
            }catch(err){
                console.log(err)
                res.status(500).json({
                    status: "error",
                    err
                })
            }
       },

       login: async (req, res, next) => {

            try{

                const {mail, contraseña} = req.body;
                
                if (!mail || !contraseña) {
                    return res.status(400).json({ message: 'Provide mail and contraseña' });
                }

                mysqlConnection.query('SELECT * FROM users WHERE mail = ?', mail, (err, user, fields) => {
                    if (!err) {
                                                
                        //const correct = await bcrypt.compare(contraseña, users[0].contraseña);
                        if(user[0].contraseña != contraseña){
                            return res.status(401).json({ message: 'Incorrect mail or contraseña' });
                        }

                    } else {
                        console.log(err);
                    }
                });
                
                const token = jwt.sign({ mail: mail}, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN, });

                res.status(200).json({
                    status: 'success',
                    token,
                    userEmail: mail,
                  });

            }catch(err){
                console.log(err);
            }
       },

       protect: async (req, res, next) => {

        try {
            let token;
        
            if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
            ) {
            token = req.headers.authorization.split(' ')[1];
            }
            
            if (!token) {
            res.status(401).json({
                message: '¡Usted no se ha identificado! Por favor inicie sesión para obtener acceso',
            });
            }
        
            // 2) verification token
            const decoded = jwt.verify(token, process.env.SECRET);
            
            // 3) Check if user still exists
            mysqlConnection.query('SELECT * FROM users WHERE mail = ?', decoded.mail, (err, user, fields) => {
                if (!err) {
                    if(!user[0]){
                        return res.status(401).json({ message: 'El token que pertenece a este usuario ya no existe' });
                    }
                    req.user = user
                    
                    next();
                    console.log("que onda mi rey");
                    
                } else {
                    console.log(err);
                }
            });
            

        } catch (err) {
            res.status(500).json(err);
        }
    }
}