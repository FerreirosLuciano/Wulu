const mysqlConnection = require('../database/db.js');
const path = require('path')
const fs = require('fs');
const { array } = require('../libs/storage.js');

module.exports = {

    getProducts: (req, res) =>{

        mysqlConnection.query('SELECT * FROM products ', (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    },
    
    getProductId: (req, res) => {
        const id  = req.params.id;
    
        mysqlConnection.query('SELECT * FROM products WHERE id = ?' , [id] , (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    },

    createProduct: (req, res) =>{
        let {titulo, precio, descripcion, metodo_pago, devoluciones, detalles, id_categories} = req.body;
        const shop_id =parseInt(req.params.id_shop);
        const img_array=req.files;
        const product= [titulo, precio, descripcion, metodo_pago, devoluciones, detalles, shop_id, id_categories];

        mysqlConnection.query('SELECT plan.max_productos, plan.max_imagenes FROM plan WHERE id IN ( SELECT plan.id FROM pagos WHERE shop_id = ? )', [shop_id],(err, plan, fields) => {
            if(!err && plan[0]){
                const max_productos = plan[0].max_productos
                const max_imagenes = plan[0].max_imagenes
                
                mysqlConnection.query('SELECT * FROM products WHERE shop_id = ?', [shop_id], (err, products, fields) => {
                    if(!err) {

                        if(products.length<max_productos){
                            mysqlConnection.query('INSERT INTO products ( `titulo`, `precio`, `descripcion`, `metodo_pago`, `devoluciones`, `detalles`, `shop_id`, `categories_id`) VALUES (?) ', [product], (err, resulted, fields) => {
                                if(resulted && img_array) {
                                    
                                    if (img_array.length <= max_imagenes && img_array.length > 1) {
                                        img_array.map(imagen =>{

                                            archivo=imagen.filename;
    
                                            ruta= path.join(__dirname, '../img/' +archivo)
                                            mysqlConnection.query('INSERT INTO imagen (`ruta`, `id_product`) VALUES (?,?) ', [ruta, resulted.insertId] , (err) => {
                                                if(!err){
                                                    res.status(200).json({status: 'Product Updated'});
                                                }else{
                                                    res.status(500).json({message: "error linea 58"});
                                                }
                                            })
                                           
                                        })
                                    } else {
                                        
                                        if (img_array.length==1) {

                                            archivo=img_array.filename;
    
                                            ruta= path.join(__dirname, '../img/' +archivo)

                                            mysqlConnection.query('INSERT INTO imagen (`ruta`, `id_product`) VALUES (?,?) ', [ruta, resulted.insertId] , (err) => {
                                                if(!err){
                                                    res.status(200).json({status: 'Product Updated'});
                                                }else{
                                                    res.status(500).json({message: "error linea 58"});
                                                }
                                            })
                                            
                                        }else{
                                            res.status(500).json({message: 'Limite de imagenes excedido'}) 
                                        }
                                    }

                                } else { res.status(500).json({message: 'Producto sin imagen'}) }
                            }); 
                            
                        } else { return res.status(401).json({ message: 'Maximo de productos alcanzado' }) }
                    } else { res.status(500).json({err}) }
                })
            } else { res.status(500).json({err}) }
        }) 
    },
    
    searchProduct: (req, res) =>{
    
        const {search} = req.body;
        if(search){ 
            mysqlConnection.query('SELECT * FROM products WHERE titulo LIKE ?, descripcion LIKE ?', ['%'+ search + '%', '%'+ search + '%'], (err, rows, fields) => {
                if(!err) {
                    res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            });
        }
    },

    searchProductDestacados: (req, res) =>{
    
        const {search} = req.body;
        
        const RANDOM = { toSqlString: function() { return 'RAND()'; } };
        if(search){ 
            mysqlConnection.query('SELECT * FROM products WHERE titulo LIKE ?, descripcion LIKE ?, ORDER BY ?', ['%'+ search + '%', '%'+ search + '%', RANDOM], (err, rows, fields) => {
                if(!err) {
                    res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            });
        }
    }
}
