const mysqlConnection = require('../database/db.js');

module.exports = {

    getSales: (req, res) =>{
        
        mysqlConnection.query('SELECT * FROM sale ', (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    }, 

    getShopId: (req, res) => {
        const id  = req.params.id;
    
        mysqlConnection.query('SELECT * FROM shop WHERE id = ?' , [id] , (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    },
    
    updateSale: (req, res) =>{
    
        const sale = req.body;
        mysqlConnection.query('INSERT INTO sale SET ?', [sale], (err, rows, fields) => {
            if(!err) {
                res.status(200).json({status: 'Sale Updated'});
            } else {
                console.log(err);
            }
        });
    }
}