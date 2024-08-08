const midtransClient = require('midtrans-client');
const { Order, User, Profile } = require('../models');

class Controller {
    static async initiateMidtrans(req, res, next) {
        try {
            const userProfile = await Profile.findOne({
                where: {
                    UserId: req.user.id
                }
            });

            if (userProfile.type === 'Premium') {
                throw {name: 'AlreadyPremium'}
            }
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });
        
            const orderId = `${new Date().getTime()}${req.user.id}`;
            const amount = 10000;

            const findUser = await User.findByPk(req.user.id);
            
            let parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": amount
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": findUser.email
                }
            };
            
            const transaction = await snap.createTransaction(parameter)
            let transactionToken = transaction.token;

            await Order.create({
                orderId,
                amount,
                UserId: req.user.id
            });
            res.status(200).json({trans_token: transactionToken, orderId});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;