const mysqlConnection = require('../database/db.js');

module.exports = {

    getShops: (req, res) =>{
        console.log(req.acciones);
        
        mysqlConnection.query('SELECT * FROM shop ', (err, rows, fields) => {
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
    
    editShop: (req, res)=>{
        
        let {nombre, rubro, descripcion ,telefono, mail, localidad, instagram, facebook} = req.body
        const id = req.shop[0].id

        mysqlConnection.query('SELECT * FROM shop WHERE id = ?' , [id] , (err, shop, fields) => {
            if (!err) {
                shop.map(data =>{
                    if(!nombre || nombre == ""){
                        nombre=data.nombre
                    }
                    if(!rubro || rubro == ""){
                        rubro=data.rubro
                    }
                    if(!descripcion || descripcion == ""){
                        descripcion=data.descripcion
                    }
                    if(!telefono || telefono == ""){
                        telefono=data.telefono
                    }
                    if(!mail || mail == ""){
                        mail=data.mail
                    }
                    if(!localidad || localidad == ""){
                        localidad=data.localidad
                    }
                    if(!instagram || instagram == ""){
                        instagram=data.instagram
                    }
                    if(!facebook || facebook == ""){
                        facebook=data.facebook
                    }
                    
                })
                mysqlConnection.query('UPDATE shop SET `nombre` = ? , `rubro` = ? , `descripcion` = ? , `telefono` = ? , `mail` = ?, `localidad` = ?, `instagram` = ?, `facebook` = ? WHERE id = ?', [nombre, rubro, descripcion ,telefono, mail, localidad, instagram, facebook, id], (err, rows, fields)=>{
                    if (!err) {
                        res.status(200).json(rows)
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log(err);
            }
        });

        
    },

    searchShop: (req, res) =>{
    
        const { search }= req.body;
    
        if(search){ 
            mysqlConnection.query('SELECT * FROM shop WHERE nombre LIKE ?, rubro LIKE ?, descripcion LIKE ?, ORDER BY ?', ['%'+ search + '%', '%'+ search + '%', '%'+ search + '%'], (err, rows, fields) => {
                if(!err) {
                    
                    res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            });
        }

    }
}