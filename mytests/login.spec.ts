import {test, expect, Browser, chromium, Page, Locator } from '@playwright/test';
import { Header } from '../modules/Header.ts';
import { ReturningCustomer } from '../pages/ReturningCustomer.ts';
const username:string = 'iambatman004@gmail.com';
const password:string = 'Abcd@1234';
const books:[string, string] = ['Fiction', 'Health Book'];

test('login', async ({page}) => {
    // const broswer: Browser = await chromium.launch({headless: false})
    // const page: Page = await broswer.newPage();
    // await page.goto("url");
    await page.goto('https://demowebshop.tricentis.com/');
    const header = new Header(page);
    const returningCustomer = new ReturningCustomer(page);
    await (await header.headerfunc('loginLink')).click();
    const emailField: Locator = await returningCustomer.returningCustomerfunc('email');
    await expect(emailField).toBeVisible();
    await emailField.fill(username);
    await (await returningCustomer.returningCustomerfunc('password')).fill(password);
    // await (await returningCustomer.returningCustomerfunc('remembermeCheckbox')).click();
    // await (await returningCustomer.returningCustomerfunc('forgotPasswordLink')).click();
    await (await returningCustomer.returningCustomerfunc('loginButton')).click();
    page.close();
    // await browser.close();
})