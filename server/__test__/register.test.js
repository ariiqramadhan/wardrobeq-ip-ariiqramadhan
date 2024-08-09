const app = require("../app");
const { verifyToken } = require("../helpers/jwt");
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const request = require('supertest');

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
});

describe('POST /login', () => {
    test('success register', async () => {
        const response = await request(app).post('/register').send({email: 'user@gmail.com', password: 'user12345'});
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id', 1);
    });

    test('register without email', async () => {
        const response = await request(app).post('/register').send({password: 'admin'});
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', expect.any(Array));
    });

    test('register without password', async () => {
        const response = await request(app).post('/register').send({email: 'admin'});
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', expect.any(Array));
    });
});