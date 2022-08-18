import { test, expect } from "@playwright/test"
import {generateRandomNumber} from './apiApp/helper'
import * as crypto from 'crypto'


test.use({ baseURL: 'https://reqres.in'});


test.describe('E2E scenario', () => {
    test('Registration & login', async ({ request }) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let body = {
            username: '',
            email: '',
            password: '',
          };

        const usersAmount = await test.step('Get an amount of all users', async () => {
            const response = await request.get(`/api/users`);
            expect(response.status()).toBe(200);
            const { total } = await response.json();
            return total;
        });
        const userCredentials = await test.step('Get a random user credentials', async () => {
            const randomUserId = generateRandomNumber(1, usersAmount);
            const response = await request.get(`/api/users/${randomUserId}`);
            expect(response.status()).toBe(200);
            const { data } = await response.json();
            return data;
        });
        const registrationToken = await test.step('Register the user', async () => {
            body.username = userCredentials.email;
            body.email = userCredentials.email;
            body.password = crypto.randomBytes(15).toString('base64');
            const response = await request.post('/api/register', {
                data: JSON.stringify(body),
                headers: headers,
            });
            expect(response.status()).toBe(200);
            const { id, token} = await response.json();
            expect(userCredentials.id).toBe(id);
            return token;
        });
        const loginToken = await test.step('Login the registered user', async () => {
            const response = await request.post('/api/login', {
                data: JSON.stringify(body),
                headers: headers,
            });
            expect(response.status()).toBe(200);
            const { token } = await response.json();
            return token;
        });

        expect(loginToken).toBe(registrationToken);
    })
})