const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require('../models');
const { readFile } = require('fs').promises;
const { queryInterface } = sequelize;
const request = require('supertest');

let token;

beforeAll(async () => {
    const cat = JSON.parse(await readFile('./data/categories.json', 'utf8'));
    cat.forEach((val) => {
        val.createdAt = val.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Categories', cat);
    await queryInterface.bulkInsert('Users', [
        {
            email: 'user@gmail.com',
            password: hashPassword('user12345'),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]);
    await queryInterface.bulkInsert('Items', [
        {
            name: "Test",
            color: "Black",
            brand: "testing",
            description: "testing",
            imageUrl: "testing",
            CategoryId: 3,
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "Test",
            color: "Black",
            brand: "testing",
            description: "testing",
            imageUrl: "testing",
            CategoryId: 3,
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "Test",
            color: "Black",
            brand: "testing",
            description: "testing",
            imageUrl: "testing",
            CategoryId: 3,
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "Test",
            color: "Black",
            brand: "testing",
            description: "testing",
            imageUrl: "testing",
            CategoryId: 3,
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ]);
    token = signToken({ id: 1 });
});


afterAll(async () => {
    await queryInterface.bulkDelete('Items', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
});

describe('GET /items', () => {
    test('success get items', async () => {
        const response = await request(app).get('/items').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('id', expect.any(Number))
    });
});
describe('POST /items', () => {
    test('success add items', async () => {
        const response = await request(app).post('/items')
        .send({name: 'test', color: 'test', brand: 'test', description: 'test', CategoryId: 1})
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id', expect.any(Number))
    });
});
describe('GET /items/cat', () => {
    test('success add items', async () => {
        const response = await request(app).get('/items/cat')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('id', expect.any(Number))
    });
});
describe('GET /items/cat/all', () => {
    test('success add items', async () => {
        const response = await request(app).get('/items/cat/all')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('id', expect.any(Number))
    });
});
describe('GET /items/cat/:catId', () => {
    test('success add items', async () => {
        const response = await request(app).get('/items/cat/1')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', 'Shirt');
    });
});
describe('GET /:itemId', () => {
    test('success add items', async () => {
        const response = await request(app).get('/items/1')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', 'Test');
    });
    test('item not found', async () => {
        const response = await request(app).get('/items/99')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Data Not Found!');
    });
});
describe('PUT /:itemId', () => {
    test('success add items', async () => {
        const response = await request(app).put('/items/1')
        .send({name: 'Ganti', color: 'ganti', brand: 'ganti', CategoryId: 3, description: 'asdsa'})
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', 'Ganti');
    });
    test('item not found', async () => {
        const response = await request(app).put('/items/99')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Data Not Found!');
    });
});
describe('DELETE /:itemId', () => {
    test('success add items', async () => {
        const response = await request(app).delete('/items/1')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Successfully delete item 1');
    });
    test('item not found', async () => {
        const response = await request(app).put('/items/99')
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Data Not Found!');
    });
});