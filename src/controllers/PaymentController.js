const mercadopago = require("mercadopago");
const mysqlConnection = require('../database/db');

mercadopago.configure({
	access_token: 'APP_USR-2601953337811157-060917-330c5b4f8ff4addc8c6194b7d74724a8-1140002070',
});

module.exports = {

    payment: (req, res) =>{

        const id_shop = 5;
        const id_plan = 1;
        let urls = {
            success: ""
        }

        mysqlConnection.query('SELECT * FROM pagos WHERE shop_id = ?' , [id_shop] , (err, pago, fields) => {
            
            if (!err) {
                console.log(pago[0]);

                if(pago[0]){
                    
                    urls= {
                        success: "http://localhost:8000/success-update-plan/" + id_shop + "/" + id_plan
                    }
                    createpref(urls);

                } else {
                    
                    urls = {
                        success: "http://localhost:8000/success-create-plan/" + id_shop + "/" + id_plan
                    }
                    createpref(urls);
                
                }
            } else {
                console.log(err);
            }
        });

        function createpref (urls) {
            console.log(urls);
        
            let preference = {
                back_urls: urls,
               auto_return: "approved", 
               items: [{   
                       id: req.body.id,
                       title: req.body.title,
                       unit_price: parseInt(req.body.price),
                       quantity: 1,
                }],
                payment_methods: {
                    excluded_payment_methods: [
                        {
                            id: "pagofacil"
                        },
                        {
                            id: "rapipago"
                        }
                    ],
                    excluded_payment_types: [
                        {
                            id: "ticket"
                        },
                        {
                            id: "tiket"
                        }
                    ],
                    installments: 12
                    }
           };
        
           mercadopago.preferences.create(preference)
               .then(function (response) {
                   res.redirect(response.body.init_point);
                   
                   console.log(response.body.init_point);

                }).catch(function (error) {
                   console.log(error);
               });
        }
    },
}
