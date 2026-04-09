import {test, expect, Browser, chromium, Page, Locator } from '@playwright/test';
import { Header } from '../modules/header.ts';
import { ReturningCustomer } from '../pages/ReturningCustomer.ts';
const email:string = 'iambatman004@gmail.com';
const password:string = 'Abcd@1234';
const books:[string, string] = ['Fiction', 'Health Book'];

test('login', async ({page}) => {
    // const broswer: Browser = await chromium.launch({headless: false})
    // const page: Page = await broswer.newPage();
    // await page.goto("url");
    await page.goto('https://demowebshop.tricentis.com/');
    const header = new Header(page);
    const returningCustomer = new ReturningCustomer(page);
    await header.ClickOnLoginLink();
    await returningCustomer.login(email, password, false);
    const intialShoppingCartQnty = await header.getShoppingCartQnty();
    const initialWishilistQnty = await header.getWishlistQnty();
    console.log(initialWishilistQnty, intialShoppingCartQnty);
    await header.verifyLoggedInEmail(email);
    await page.close();
    // await browser.close();
})