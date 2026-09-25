import { test, expect } from '@playwright/test'

const fileInput = '#fileInput'
const fileList = '#fileListContainer'

test.beforeEach(async ({ page }) => {
    await page.goto('Files.html')
})

test('shows the empty state before files are selected', async ({ page }) => {
    await expect(page.locator(fileList)).toHaveText('No files selected')
    await expect(page.locator('#clearBtn')).toBeHidden()
})

test('uploads multiple files and displays their sizes', async ({ page }) => {
    const fileName1 = 'file1.txt'
    const fileName2 = 'file2.txt'

    await page.locator(fileInput).setInputFiles([
        {
            name: fileName1,
            mimeType: 'text/plain',
            buffer: Buffer.from('Test file')
        },
        {
            name: fileName2,
            mimeType: 'text/plain',
            buffer: Buffer.from('Test file')
        }
    ])

    await expect(page.locator(fileList)).toContainText(fileName1)
    await expect(page.locator(fileList)).toContainText(fileName2)
    await expect(page.locator('.file-item')).toHaveCount(2)
    await expect(page.locator('.file-size').first()).toHaveText('9 Bytes')
    await expect(page.locator('#clearBtn')).toBeVisible()
})

test('does not add the same file twice', async ({ page }) => {
    const file = {
        name: 'duplicate.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('same content')
    }

    await page.locator(fileInput).setInputFiles(file)
    await page.locator(fileInput).setInputFiles(file)

    await expect(page.locator('.file-item')).toHaveCount(1)
})

test('clears all selected files', async ({ page }) => {
    await page.locator(fileInput).setInputFiles({
        name: 'file.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Test file')
    })

    await page.locator('#clearBtn').click()

    await expect(page.locator(fileList)).toHaveText('No files selected')
    await expect(page.locator('#clearBtn')).toBeHidden()
    await expect(page.locator(fileInput)).toHaveValue('')
})

test('downloads the sample document', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download Document' }).click()

    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe('sample-document.pdf')
})