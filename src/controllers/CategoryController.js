const mysqlConnection = require('../database/db');

module.exports = {

    getCategories: (req, res) =>{

        mysqlConnection.query('SELECT * FROM `categories` ' ,  (err, rows, fields) => {
            if(!err){
                res.status(200).json({ rows })
            }else{ console.log(err) }
        });
    },

    searchCategories: (req, res) =>{
        const { search } = req.body;
        
        if(search){ 
            mysqlConnection.query('SELECT * FROM categories WHERE nombre LIKE ?', ['%'+ search + '%'], (err, rows, fields) => {
                if(!err) {
                    
                    res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            });
        }
    },

}