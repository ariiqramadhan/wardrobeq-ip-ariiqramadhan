const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');

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
    
    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.headers;
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            
            const { email, name } = ticket.payload;
            
            const [user, created] = await User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    email,
                    password: Math.random() * 9
                },
                hooks: false
            });

            const access_token = signToken({id: user.id});
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
}

module.exports = Controller;