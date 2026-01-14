import { test, expect } from '@playwright/test';

test('Complex button test', async ({page})=>{
    // less than the needed time, the test breaks
    test.setTimeout(3000)
    
    await page.goto('ComplexButton.html')

    const button = page.locator('button')

    await expect(button).toBeVisible()

    await expect(button).toBeEnabled()
    
    await expect( page.locator('#myLabel')).toBeVisible()
})
