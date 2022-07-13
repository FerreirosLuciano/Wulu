const mysqlConnection = require('../database/db');

module.exports = {

    CreatePago: (req,res) => {

        try {
                   
        const pago = {
            cantidad: 1,
            plan_id: req.params.id_plan,
            shop_id: req.params.id_shop,
        }
        
        mysqlConnection.query('INSERT INTO pagos SET ?', pago, (err) => {
            if(!err) {
                /* res.status(200).json({
                    status: 'Pago Updated'
                }); */
                res.status(200).redirect("http://localhost:8000/shop/" + req.params.id_shop);
            } else {
                console.log(err);
            }
        });
        } catch (error) {
            console.log(err);
        }
    },

    UpdatePago: (req, res) => {

        const CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
        
        const id_shop= req.params.id_shop;
        
        mysqlConnection.query('SELECT cantidad FROM pagos WHERE shop_id = ?' , [id_shop] , (err, pago, fields) => {
            if(!err) {

                const newpago = {
                    cantidad: pago[0].cantidad +1,
                    fecha_pago: CURRENT_TIMESTAMP 
                }

                mysqlConnection.query('SELECT cantidad FROM pagos WHERE shop_id = ?', [id_shop]  , (err, user) => {
                    if(!err) {
        
                        mysqlConnection.query('UPDATE pagos set?', [newpago], (err, rows, fields) => {
                            if(!err) {
                                /*  res.status(200).json({
                                    status: 'Pago Updated'
                                }); */
                                res.status(200).redirect("http://localhost:8000/shop/" + id_shop);
        
                            } else {
                                console.log(err);
                            }
                        });
        
                    } else {
                        console.log(err);
                    }
                });

            } else {
                console.log(err);
            }
        });
    }
}