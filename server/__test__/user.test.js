const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const request = require('supertest');

let token;

beforeAll(async () => {
    token = signToken({id: 1});
});


afterAll(async () => {
    await queryInterface.bulkDelete('Profiles', null, {
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

describe('GET /user', () => {
    test('success register', async () => {
        const response = await request(app).post('/register').send({email: 'user@gmail.com', password: 'user12345'});
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id', 1);
    });
    test('success get logged in user\'s info', async () => {
        const response = await request(app).get('/user').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('UserId', 1);
        expect(response.body).toHaveProperty('type', expect.any(String));
    });
});
describe('PUT /user', () => {
    test('success update user\'s info', async () => {
        const response = await request(app).put('/user')
        .send({name: 'Roy', skinUndertone: 'Warm'})
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Successfully update profile');
    });
});