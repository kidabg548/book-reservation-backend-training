const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();  
const config = require('../config/database'); 

describe('App.js Tests', () => {

    beforeAll(async () => {
        await mongoose.connect(config.database, { 
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should return 404 for the root path', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
    });

    it('should return 404 for a non-existent route', async () => {
        const response = await request(app).get('/nonexistent');
        expect(response.statusCode).toBe(404);
    });

    it('should return 200 for /api/books route even without a token', async () => { 
        const response = await request(app).get('/api/books');
        expect(response.statusCode).toBe(200); 
    });

    it('should return 200 for /api/books route even without a token', async () => { 
        const response = await request(app).get('/api/books');
        expect(response.statusCode).toBe(200); 
    });

});