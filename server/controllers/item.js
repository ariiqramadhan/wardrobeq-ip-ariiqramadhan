const { Item } = require('../models');

class Controller {
    static async addItem(req, res, next) {
        try {
            const { name, color, brand, CategoryId } = req.body;
            const data = await Item.create({
                name,
                color,
                brand,
                CategoryId,
                UserId : req.user.id
            });

            res.status(201).json(data);
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