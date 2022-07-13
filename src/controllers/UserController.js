const mysqlConnection = require('../database/db');
const { fields } = require('../libs/storage');

module.exports = {

    getUsers: (req, res) => {

        mysqlConnection.query('SELECT * FROM users ', (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
        
    },

    getUserId: (req, res) => {

    const id  = req.params.id;

        mysqlConnection.query('SELECT * FROM users WHERE id = ?' , [id] , (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    },
    
    editUser: (req, res) =>{

        const {dni, nombre, apellido, telefono, mail} = req.body
        const id = req.user[0].id

        mysqlConnection.query('UPDATE users SET `dni` = ? , `nombre` = ? , `apellido` = ? , `telefono` = ? , `mail` = ?  WHERE id = ?', [dni, nombre, apellido, telefono, mail, id], (err, rows, fields)=>{
            if (!err) {
                res.status(200).json(rows)
            } else {
                console.log(err);
            }
        })
    },

    getFavoritesProducts: (req, res) => {

        const id_user  = req.user[0].id;
            mysqlConnection.query('SELECT products.* FROM users JOIN favorites_products ON favorites_products.id_user = users.id JOIN products ON favorites_products.id_product = products.id WHERE users.id = ?' , [id_user] , (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    
    },

    getFavoritesShops: (req, res) => {

        const id_user  = req.user[0].id;
            mysqlConnection.query('SELECT shop.* FROM users JOIN favorites_shop ON favorites_shop.id_user = users.id JOIN shop ON favorites_shop.id_shop = shop.id WHERE users.id = ?' , [id_user] , (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    
    },

}