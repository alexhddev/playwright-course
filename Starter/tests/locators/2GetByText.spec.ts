import { test, expect } from '@playwright/test';

test('Get by text practice', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const title = page.getByText('Feedback Form').first();
    await expect(title).toBeVisible()
})

test('Get by text practice - error messages', async ({ page }) => {
    await page.goto('FeedBackForm.html')
    
    const emailValidationMessage = page.getByText('Invalid email format')
    await expect(emailValidationMessage).toBeHidden()

    await page.getByRole('textbox', {
        name: 'email'
    }).fill('john@email')
    await expect(emailValidationMessage).toBeVisible()

    await page.getByRole('textbox', {
        name: 'email'
    }).fill('john@email.com')
    await expect(emailValidationMessage).toBeHidden()
})


test('Get by text practice - hidden elements', async ({ page }) => {
    await page.goto('FeedBackForm.html')
    
    const hiddenButton = page.getByText('Hidden feature') 
    await expect(hiddenButton).toBeHidden() 

    const hiddenButtonText = await hiddenButton.textContent()
    console.log(hiddenButtonText)

    const hiddenButtonWithRole = page.getByRole('button', {
        name: 'Hidden feature'
    }) 

    // not working
    // const hiddenButtonWithRoleText = await hiddenButtonWithRole.textContent()
})