import { test, expect } from '@playwright/test';

test('Get by Role practice - heading', async ({ page }) => {
    await page.goto('')

    const servicesHeading = page.getByRole('heading', {
        name: 'our services'
    })

    await expect(servicesHeading).toBeVisible()
})

test('Get by Role - list', async ({ page }) =>{
    await page.goto('')

    const servicesList = page.getByRole('list')
    await expect(servicesList).toBeVisible()

    const serviceItems = await servicesList.getByRole('listitem').all()

    for(const item of serviceItems) {
        const itemText = await item.textContent()
        expect(itemText).toBeTruthy()
    }
})

test('Get by Role - Buttons', async ({ page }) =>{
    await page.goto('') 

    const acceptCookiesButton = page.getByRole('button', {
        name: 'Accept',
        exact: true
    })
    const declineCookiesButton = page.getByRole('button', {
        name: 'decline'
    })

    await acceptCookiesButton.click()

    await expect(acceptCookiesButton).not.toBeVisible()
    await expect(declineCookiesButton).not.toBeVisible()
})

test('Get by Role - link', async ({ page }) =>{
    await page.goto('')  

    await page.getByRole('button', {
        name: 'decline'
    }).click()
    
    await page.getByRole('link', {
        name: 'Go to Feedback Form'
    }).click()

    const url = page.url()
    expect(url).toContain('FeedBack')
})




