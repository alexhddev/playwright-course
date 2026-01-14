import { test, expect } from '@playwright/test';

test('Name field value', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const nameField = page.getByLabel('name')

    await nameField.fill('John')
    console.log('Filling the name field')

    // break the test
    await page.keyboard.press('A')
    console.log('Wil typing break the test?')

    await expect(nameField).toHaveValue('John', {
        timeout: 100
    })
})
