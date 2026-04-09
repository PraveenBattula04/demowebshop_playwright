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
    await page.getByRole('link', { name: `Shopping cart (${books.length})` }).click();
});




// test('test', async ({ page }) => {
//   await page.goto('https://demowebshop.tricentis.com/');
//   await page.getByRole('link', { name: 'Books' }).first().click();
  
//   await page.locator('input[name="itemquantity6346113"]').click();
//   await page.locator('input[name="itemquantity6346115"]').click();
//   await page.getByRole('cell', { name: 'Computing and Internet', exact: true }).click();
//   await page.locator('div').filter({ hasText: 'Shopping cart Remove Product(' }).nth(3).click();
//   await page.locator('#termsofservice').check();
//   await page.getByRole('button', { name: 'Checkout' }).click();
//   await page.getByLabel('Country:').selectOption('41');
//   await page.getByRole('textbox', { name: 'City:' }).click();
//   await page.getByRole('textbox', { name: 'Address 1:' }).click();
//   await page.getByRole('textbox', { name: 'Address 2:' }).click();
//   await page.getByRole('textbox', { name: 'Zip / postal code:' }).click();
//   await page.getByRole('textbox', { name: 'Phone number:' }).click();
//   await page.getByRole('button', { name: 'Continue' }).click();
//   await page.getByRole('textbox', { name: 'City:' }).click();
// });