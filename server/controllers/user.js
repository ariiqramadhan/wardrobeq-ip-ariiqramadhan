const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User, Profile, Order } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const data = await User.create({
                email,
                password
            });
            await Profile.create({
                UserId: data.id
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
            
            const { email, name, picture } = ticket.payload;
            
            const [data, created] = await User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    email,
                    password: Math.random() * 9
                },
                hooks: false
            });

            if (created) {
                await Profile.create({
                    UserId: data.id,
                    name: name.split(' ').map(val => val[0].toUpperCase() + val.substring(1)).join(' '),
                    imageUrl: picture
                });
            }

            const access_token = signToken({id: data.id});
            res.status(200).json({access_token});
        } catch (err) {
            next(err);
        }
    }
    
    static async userInfo(req, res, next) {
        try {
            const user = await Profile.findOne({
                where: {
                    UserId: req.user.id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
    
    static async updateProfile(req, res, next) {
        try {
            const { name, skinUndertone } = req.body;
            await Profile.update({
                name,
                skinUndertone
            },
            {
                where: {
                    UserId: req.user.id
                }
            });

            res.status(200).json({message: 'Successfully update profile'});
        } catch (err) {
            next(err);
        }
    }
    
    static async uploadPhoto(req, res, next) {
        try {
            const image = req.file;
            const base64 = Buffer.from(image.buffer).toString('base64');
            cloudinary.config({ 
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
                api_key: process.env.CLOUDINARY_API_KEY, 
                api_secret: process.env.CLOUDINARY_API_SECRET
            });
            const response = await cloudinary.uploader.upload(`data:${image.mimetype};base64,${base64}`,
                {
                    public_id: image.originalname,
                    folder: 'IProject'
                }
            );
            await Profile.update({
                imageUrl: response.secure_url
            },
            {
                where: {
                    UserId: req.user.id
                }
            });
            res.status(200).json({message: 'Successfully upload image'});
        } catch (err) {
            next(err);
        }
    }
    
    static async upgrade(req, res, next) {
        try {
            const { orderId } = req.body;
            const order = await Order.findOne({
                where: {
                    orderId
                }
            });

            if (!order) {
                throw {name: 'DataNotFound'};
            }

            const base64Server = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64');
            const { data } = await axios({
                method: 'get',
                url: `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
                headers: {
                    Authorization: `Basic ${base64Server}`
                }
            });

            if (data.transaction_status === 'capture' && data.status_code === '200') {
                await Profile.update({
                    type: 'Premium'
                },
                {
                    where: {
                        UserId: req.user.id
                    }
                });
                await order.update({status: 'Paid'});
                res.status(200).json({message: 'Upgrade Success'});
            } else {
                throw {name: 'UpgradeFailed'}
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;