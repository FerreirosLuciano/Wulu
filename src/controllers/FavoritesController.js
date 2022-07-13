const mysqlConnection = require('../database/db');

module.exports = {

    createShopFavorites: (req, res) =>{
        console.log(req.shop)
        const id_shop = req.params.id_shop;
        const id_user= req.user[0].id;
        const favorites = [id_user, id_shop]

        mysqlConnection.query('INSERT INTO favorites_shop (`id_user`, `id_shop`) values (?)' , [favorites], (err, rows, fields) => {
            if(!err){
                res.status(200).json({ status: "Favorites Updated"})
            }else{ console.log(err) }
        });
    },

    createProductsFavorites: (req, res) =>{

        const id_product = req.params.id;
        const id_user= req.user[0].id;
        const favorites = [id_user, id_product]

        mysqlConnection.query('INSERT INTO favorites_products (`id_user`, `id_product`) values (?)' , [favorites], (err, rows, fields) => {
            if(!err){
                res.status(200).json({ status: "Favorites Updated"})
            }else{ console.log(err) }
        });
    },

    searchFavorites: (req, res) =>{
    
        const { search }= req.body;
    
        if(search){ 
            mysqlConnection.query('SELECT oferta.* FROM oferta JOIN productos ON oferta.product_id = products.id WHERE products.nombre LIKE ?, products.rubro LIKE ?, products.descripcion LIKE ?', ['%'+ search + '%', '%'+ search + '%', '%'+ search + '%'], (err, rows, fields) => {
                if(!err) {
                    
                    res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            });
        }

    }
}