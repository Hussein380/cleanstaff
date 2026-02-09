const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Staff = require('../src/models/Staff');
const staffRoutes = require('../src/routes/staffRoutes');
const authRoutes = require('../src/routes/authRoutes');
const { authLimiter } = require('../src/middleware/security');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);

let adminToken;
let staffId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Create Admin User for testing
    await User.deleteOne({ email: 'admin-test@example.com' });
    const res = await request(app)
        .post('/api/auth/register')
        .send({
            email: 'admin-test@example.com',
            password: 'password123',
            role: 'admin',
            profileModel: 'Admin' // Admin doesn't need profile doc for this test really
        });
    adminToken = res.body.token;
});

afterAll(async () => {
    await User.deleteOne({ email: 'admin-test@example.com' });
    if (staffId) await Staff.findByIdAndDelete(staffId);
    await mongoose.connection.close();
});

describe('Staff Management API', () => {
    it('should create a new staff member (Admin only)', async () => {
        const res = await request(app)
            .post('/api/staff')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'John Doe',
                email: 'john.doe@cleanstaff.com',
                phone: '+254700000001',
                role: 'Cleaner'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toEqual('John Doe');
        staffId = res.body._id;
    });

    it('should get all staff members', async () => {
        const res = await request(app)
            .get('/api/staff')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        const found = res.body.find(s => s._id === staffId);
        expect(found).toBeTruthy();
    });

    it('should delete staff member (Admin only)', async () => {
        const res = await request(app)
            .delete(`/api/staff/${staffId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Staff deleted successfully');
    });
});
