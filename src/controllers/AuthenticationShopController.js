const mysqlConnection = require('../database/db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports = {

        signup: async (req, res) => {
            try{
                const {nombre, rubro, descripcion, telefono, mail, contraseña, localidad, instagram, facebook, imagen, user_id} = req.body
                const shop = {nombre, rubro, descripcion, telefono, mail, contraseña, localidad, instagram, facebook, imagen, user_id}
                const result = await mysqlConnection.query('INSERT INTO shop SET ?', shop);
                
                const token = jwt.sign({ mail: shop.mail}, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN, });

                res.status(200).json({
                    status: "success",
                    message: "Shop Created",
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

                mysqlConnection.query('SELECT * FROM shop WHERE mail = ?', mail, (err, shop, fields) => {
                    if (!err) {
                                                
                        //const correct = await bcrypt.compare(contraseña, shops[0].contraseña);
                        if(shop[0].contraseña != contraseña){
                            return res.status(401).json({ message: 'Incorrect mail or contraseña' });
                        }

                        const token = jwt.sign({ mail: mail}, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN, });
        
                        res.status(200).json({
                            status: 'success',
                            token,
                            shopEmail: mail,
                          });

                    } else {
                        console.log(err);
                    }
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
            
            const decoded = await jwt.verify(token, process.env.SECRET);
            console.log(decoded)
            // 3) Check if shop still exists
            mysqlConnection.query('SELECT * FROM shop WHERE mail = ?', decoded.mail, (err, shop, fields) => {
                if (!err) {
                    if(!shop[0]){
                        console.log("llega")
                        return res.status(401).json({ message: 'El token que pertenece a este usuario ya no existe' });
                    }
                } else {
                    console.log(err);
                }
                
                req.shop = shop;
                next();
            });
            

        } catch (err) {
            res.status(500).json(err);
        }
    }
}