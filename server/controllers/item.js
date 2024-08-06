const { Item, Category } = require('../models');

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
    
    static async items(req, res, next) {
        try {
            const data = await Item.findAll({
                where: {
                    UserId: req.user.id
                },
                include: {
                    model: Category,
                    attributes: ['name']
                }
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
    
    static async catItems(req, res, next) {
        try {
            const data = await Category.findAll({
                include: {
                    model: Item,
                    attributes: ['name', 'color', 'brand', 'imageUrl'],
                    where: {
                        UserId: req.user.id
                    }
                },
                attributes: ['id', 'name']
            });
            res.status(200).json(data);
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
}

module.exports = Controller;