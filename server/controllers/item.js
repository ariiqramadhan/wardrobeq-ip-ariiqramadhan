const { Item, Category } = require('../models');
const OpenAI = require('openai');
const cloudinary = require('cloudinary').v2;

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
                    required: false,
                    limit: 5,
                    order: [
                        ['createdAt', 'DESC']
                    ]
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
            const { name, color, description, brand, CategoryId } = req.body;

            const data = await Item.update({
                name,
                color,
                brand,
                CategoryId,
                description
            },
            {
                where: {
                    id: itemId
                },
                returning: true
            });
            console.log(data[1][0].dataValues);
            res.status(200).json(data[1][0].dataValues);
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
    
    static async itemDetail(req, res, next) {
        try {
            const { itemId } = req.params;
            const data = await Item.findByPk(itemId, {
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

    static async uploadPhoto(req, res, next) {
        try {
            const { itemId } = req.params;
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
                    folder: 'IProject/item'
                }
            );
            await Item.update({
                imageUrl: response.secure_url
            },
            {
                where: {
                    id: itemId
                }
            });
            res.status(200).json({message: 'Successfully upload image'});
        } catch (err) {
            next(err);
        }
    }
    
    static async itemByCat(req, res, next) {
        try {
            const { catId } = req.params;
            const data = await Category.findByPk(catId, {
                include: {
                    model: Item,
                    where: {
                        UserId: req.user.id
                    }
                }
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