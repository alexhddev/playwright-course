import { test, expect } from '@playwright/test';
import * as loginPage from '../pages/Login'
import path from 'path';
import fs from 'fs';

const authSessionFile = path.resolve(__dirname, '../../playwright/.auth/user.json');

// Read and parse the JSON file
const loginDataFile = path.resolve(__dirname, '../../playwright/.auth/loginData.json');
const loginData = JSON.parse(fs.readFileSync(loginDataFile, 'utf-8')) as {
    email: string,
    pass: string
}

test('authenticate', async ({ page }) => { 
    await page.goto('/login')
    await loginPage.login(
        page,
        loginData.email,
        loginData.pass
    )
    await loginPage.verifySuccessfulLogin(page)

    await page.context().storageState({
        path: authSessionFile
    })



    
})