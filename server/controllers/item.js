const { Item, Category } = require('../models');
const OpenAI = require('openai');

class Controller {
    static async addItem(req, res, next) {
        try {
            const { name, color, brand, CategoryId, description } = req.body;
            const data = await Item.create({
                name,
                color,
                brand,
                description,
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
                    attributes: ['id', 'name', 'color', 'brand', 'description', 'imageUrl'],
                    where: {
                        UserId: req.user.id
                    },
                    required: false
                },
                attributes: ['id', 'name', 'description']
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
    
    static async updateItem(req, res, next) {
        try {
            const { itemId } = req.params;
            const { name, color, brand, CategoryId } = req.body;

            await Item.update({
                name,
                color,
                brand,
                CategoryId
            },
            {
                where: {
                    id: itemId
                }
            });
            res.status(200).json({message: `Successfully update item ${itemId}`});
        } catch (err) {
            next(err);
        }
    }
    
    static async deleteItem(req, res, next) {
        try {
            const { itemId } = req.params;
            await Item.destroy({
                where: {
                    id: itemId
                }
            });
            res.status(200).json({message: `Successfully delete item ${itemId}`});
        } catch (err) {
            next(err);
        }
    }

    static async funFact(req, res, next) {
        try {
            const { name, brand, catName } = req.body;

            let prompt = `Give me fun fact about ${name}`

            if (brand) {
                prompt += ` from brand ${brand}`
            }

            prompt += `. It is a ${catName}. Answer with no longer than 70 tokens`;

            const openai = new OpenAI({
                organization: 'org-E6Ob5JJ9T13GMlawLCn30Z9m',
                project: 'proj_VANQTey2TdIV29dgFiUzfIy4'
            });

            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: prompt}],
                model: "gpt-4o-mini",
                max_tokens: 70
            });

            res.status(200).json(completion.choices[0].message.content);
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