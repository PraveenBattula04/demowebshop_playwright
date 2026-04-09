import { test, expect } from '@playwright/test';
const username:string = 'iambatman004@gmail.com';
const password:string = 'Abcd@1234';
const books:[string, string] = ['Fiction', 'Health Book']

test('demo web shop', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle(/Demo Web Shop/);
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).fill(username);
    await page.getByRole('textbox', { name: 'Password:' }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText(username)).toBeVisible();
    await page.getByRole('link', { name: `Shopping cart ()`})
    await page.getByRole('link', { name: 'Books' }).first().click();
    // await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    for (const item of books) {
        const bookItem = await page.locator('.item-box').filter({ hasText: item });
        // await bookItem.scrollIntoViewIfNeeded();   // ensures it's in the viewport
        // await expect(bookItem).toBeVisible();
        await bookItem.getByRole('button', { name: 'Add to cart' }).click();
        console.log(`Clicked: ${item}`);
    }
    // await expect(page.getByText(`Shopping cart (${books.length})`)).toBeVisible();
    // await page.getByRole('link', { name: `Shopping cart (${books.length})` }).click();
});