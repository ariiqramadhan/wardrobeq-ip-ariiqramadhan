const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { verifyToken } = require("../helpers/jwt");
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const request = require('supertest');

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', [
        {
            email: 'user@gmail.com',
            password: hashPassword('user12345'),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'user2@gmail.com',
            password: hashPassword('user12345'),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
});

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
});

describe('POST /login', () => {
    test('login success and get access_token', async () => {
        const response = await request(app).post('/login').send({email: 'user@gmail.com', password: 'user12345'});
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('access_token', expect.any(String));
        expect(verifyToken(response.body.access_token)).toBeInstanceOf(Object);
        expect(verifyToken(response.body.access_token)).toHaveProperty('id', 1);
    });

    test('login without email', async () => {
        const response = await request(app).post('/login').send({password: 'admin'});
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Please input your email!');
    });

    test('login without password', async () => {
        const response = await request(app).post('/login').send({email: 'admin'});
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Please input your password!');
    });

    test('login with invalid email', async () => {
        const response = await request(app).post('/login').send({email: 'admin@gmail.com', password: 'admin'});
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Invalid email or password!');
    });

    test('login with invalid password', async () => {
        const response = await request(app).post('/login').send({email: 'admin', password: 'passwordsalah'});
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Invalid email or password!');
    });
});