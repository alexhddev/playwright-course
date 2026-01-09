import { test, expect } from '@playwright/test'

test('Check actions', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const checkBox = page.getByRole('checkbox', { name: 'I agree to the site' })

    await checkBox.check();
    await checkBox.uncheck();

    await expect(checkBox).not.toBeChecked()
})

test('Selection actions', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const improvementInput = page.getByLabel('Areas for Improvement')

    await improvementInput.selectOption('content')

    await expect(improvementInput).toHaveValue('content')

    improvementInput.selectOption(['presentation', 'timing'])

    await expect(improvementInput).toHaveValues(['presentation', 'timing'])
})