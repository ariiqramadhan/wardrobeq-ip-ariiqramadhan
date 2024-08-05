const { User } = require('../models');

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const data = await User.create({
                email,
                password
            });
            
            res.status(201).json({id: data.id, email: data.email});
        } catch (err) {
            next(err);
        }
    }
    
    // static async register(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    
    // static async register(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    
    // static async register(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    
    // static async register(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    
    // static async register(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
}

module.exports = Controller;