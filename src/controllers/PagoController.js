const mysqlConnection = require('../database/db.js');

module.exports = {

    authenticationPlan: (req, res, next) =>{
    
        const shop_id = req.params.id_shop

        let nowDate = new Date();

        mysqlConnection.query('SELECT * FROM pagos WHERE shop_id = ?' , [shop_id] , (err, pago, fields) => {

            if(!err){
                if(!pago){
                    console.log(pago)
                    return res.status(401).json({ message: 'No dispone de ningun plan' });
                } 
                //Obtengo mes de pago y mes actual
                const monthActual = nowDate.getMonth()
                const monthPago = pago[0].fecha_pago.getMonth()

                //Obtengo dia de pago y dia actual
                const dayExpired = nowDate.getDate()
                const dayPago = pago[0].fecha_pago.getDate()

                if( (monthPago+1) == monthActual ){ 
                    console.log(pago)
                    req.pago = pago;
                    next() 

                } else { 
                    
                    if(monthPago==monthActual && dayPago <= dayExpired) { 
                        req.pago= pago;
                        next()
                    }
                    return res.status(401).json({ message: 'No dispone de ningun plan' }) 
                }

            }else {
                console.log(err)
            }
        })
    },

}