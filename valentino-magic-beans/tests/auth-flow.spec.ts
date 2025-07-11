import { test } from '@playwright/test';
import { EmailUtils } from './utils/EmailUtils'
import * as signUpPage from './pages/SignUp'
import * as loginPage from './pages/Login'
import { join, resolve } from 'path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

const testSignUp = process.env.SIGN_UP_FLOW

test('Sign up', async ({ page }) => {
    test.skip(testSignUp !== 'true', 'Skipping sign up test')
    const emailUtils = new EmailUtils()
    const inbox = await emailUtils.createInbox();

    await page.goto('/signup')

    await signUpPage.signUp(page, inbox.emailAddress)

    const email = await emailUtils.waitForLatestEmail(inbox.id)

    // get the code\ from the email body:
    const code = /([0-9]{6})$/.exec(email?.body!)![1];

    await signUpPage.addConfirmationCode(page, code)

    await loginPage.login(page, inbox.emailAddress, signUpPage.signUpData.pass)

    // check if successful login:
    await loginPage.verifySuccessfulLogin(page)

    // persist login data:
    const loginData = {
        email: inbox.emailAddress,
        pass: signUpPage.signUpData.pass
    }
    const authDir = resolve(__dirname, '../playwright/.auth');
    if (!existsSync(authDir)) {
        mkdirSync(authDir, { recursive: true });
    }
    writeFileSync(
        join(authDir, 'loginData.json'),
        JSON.stringify(loginData, null, 2)
    );

})