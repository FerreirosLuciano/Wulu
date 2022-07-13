const mysqlConnection = require('../database/db');

module.exports = {


    getOfertas: (req, res) =>{

        mysqlConnection.query('SELECT * FROM oferta', (err, rows )=>{
            if(!err){
                res.status(200).json(rows)
            }else{
                console.log(err);
            }

        })
    },

    createOferta: (req, res) =>{
        let {detalles, precio, product_id } = req.body

        mysqlConnection.query('INSERT INTO oferta (`detalles`, `precio`, `product_id`) values (?, ?, ?)' , [detalles, precio, product_id], (err) => {
            if(!err){
                res.status(200).json({ status: "Oferta Updated"})
            }else{ console.log(err) }
        });
    },

    editarOferta: (req, res) =>{
        
        const id_oferta = req.params.id;

        let {detalles, precio} = req.body

        mysqlConnection.query('SELECT * FROM oferta WHERE id = ?', [id_oferta],  (err, oferta )=>{
            if(!err){
                oferta.map(data =>{
                    if (!detalles || detalles=="") {
                        detalles = data.detalles
                    }
                    if (!precio || precio=="") {
                        precio = data.precio
                    }
                    
                })
                mysqlConnection.query('UPDATE oferta SET `detalles` = ? , `precio` = ? WHERE id = ?' , [detalles, precio, id_oferta ], (err, rows, fields) => {
                    if(!err){
                        res.status(200).json({ status: "Oferta Updated"})
                    }else{ console.log(err) }
                });
                
            }else{
                console.log(err);
            }

        })

       
    },

    searchOferta: (req, res) =>{
    
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