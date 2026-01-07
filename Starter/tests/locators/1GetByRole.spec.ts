import { test, expect } from '@playwright/test';

test('Get by Role practice - heading', async ({ page }) => {
    await page.goto('')

    const servicesHeading = page.getByRole('heading', {
        name: 'our services'
    })

    await expect(servicesHeading).toBeVisible()
})
