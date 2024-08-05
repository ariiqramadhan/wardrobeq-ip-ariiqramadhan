const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
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
    
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) throw {name: 'EmailRequired'};
            if (!password) throw {name: 'PasswordRequired'};

            const findUser = await User.findOne({
                where: {
                    email
                }
            });

            if (!findUser) throw {name: 'InvalidCredentials'};
            
            if (!comparePassword(password, findUser.password)) throw {name: 'InvalidCredentials'};

            const access_token = signToken({id: findUser.id});
            res.status(200).json({access_token});
        } catch (err) {
            next(err);
        }
    }
    
    // static async template(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    
    // static async template(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    
    // static async template(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    
    // static async template(req, res, next) {
    //     try {
            
    //     } catch (err) {
    //         next(err);
    //     }
    // }
}

module.exports = Controller;