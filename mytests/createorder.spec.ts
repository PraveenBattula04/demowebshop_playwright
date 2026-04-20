import {test, expect, Browser, chromium, Page, Locator } from '@playwright/test';
import { Header } from '../modules/header.ts';
import { ReturningCustomer } from '../pages/ReturningCustomer.ts';
import { ItemCategories } from '../modules/categories/itemCategories.ts';
import { SubItemsCategories } from '../modules/categories/subItemcategories.ts';
import { ViewItem } from '../pages/items/viewItem.ts';
import { ProductDetailsPage } from '../pages/items/ProductDetailsPage.ts';
import { ShoppingCart } from '../pages/ShoppingCart.ts';
import { CheckoutPge } from '../pages/checkout/checkoutPage.ts';
import { BillingAddressPage } from '../pages/checkout/BillingAddressPage.ts';
import { ShippingAddressPage } from '../pages/checkout/ShippingAddressPage.ts';
import { PaymentMethodPage } from '../pages/checkout/PaymentMethodPage.ts';
import { PaymentInfoPage } from '../pages/checkout/PaymentInfoPage.ts';
import { ShippingMethodPage } from '../pages/checkout/ShippingMethodPage.ts';
import { ConfirmOrderPage } from '../pages/checkout/ConfirmOrderPage.ts';
import { OrderCompletedPage } from '../pages/checkout/OrderCompletedPage.ts';


const email:string = 'iambatman004@gmail.com';
const password:string = 'Abcd@1234';
const category:string = 'apparelandshoes';
const subItemCategory:string = ''
const itemName:string = 'Blue Jeans';
const itemQnty:number = 1;
const country = 'India';
const city = 'Hyderabad'
const address1 = 'hyderabad'
const state = 'Other (Non US)';
const zipCode = '555555';
const phone = '123456789'


test('Create Order', async ({page}) => {
    // const broswer: Browser = await chromium.launch({headless: false})
    // const page: Page = await broswer.newPage();
    // await page.goto("url");
    await page.goto('https://demowebshop.tricentis.com/');
    const header = new Header(page);
    const returningCustomer = new ReturningCustomer(page);
    const itemCategories = new ItemCategories(page);
    const subItemCategories = new SubItemsCategories(page);
    const viewItem = new ViewItem(page);
    const productPage = new ProductDetailsPage(page);
    const shoppingCart = new ShoppingCart(page);
    const checkoutPage = new CheckoutPge(page);
    const billingAddressPage = new BillingAddressPage(page);
    const shippingAddressPage = new ShippingAddressPage(page);
    const shippingMethodPage = new ShippingMethodPage(page);
    const paymentMethodpage = new PaymentMethodPage(page);
    const paymentInfoPage = new PaymentInfoPage(page);
    const confirmOrderPage = new ConfirmOrderPage(page);
    const orderCompletedPage = new OrderCompletedPage(page);
    await header.ClickOnLoginLink();
    await returningCustomer.login(email, password, false);
    const intialShoppingCartQnty = await header.getShoppingCartQnty();
    const initialWishilistQnty = await header.getWishlistQnty();
    await header.verifyLoggedInEmail(email);
    await itemCategories.clickOnCategory(category);
    await subItemCategories.clickOnSubCategory(subItemCategory);
    await viewItem.clickToViewItem(itemName);
    await productPage.addItemToCart(itemName, itemQnty);
    const finalShoppingCartQnty = await header.getShoppingCartQnty();
    expect(intialShoppingCartQnty).toBe(finalShoppingCartQnty);
    await header.ClickOnShoppingCartLink();
    await shoppingCart.increaseQntyOfItem(itemName, itemQnty + 1);
    await shoppingCart.clickOnUpdateShoppingCart();
    await shoppingCart.verifyAllProductTotals();
    await shoppingCart.estimateShipping(country, state, zipCode)
    await shoppingCart.verifyCartRowTotalsAndSubtotal();
    // await shoppingCart.verifyCartSummaryCalculations();
    await shoppingCart.clickOnAgreeToTerms();
    await shoppingCart.clickCheckout();
    await page.waitForLoadState('load');
    await checkoutPage.verifyCheckoutTitle();
    const newAddressOption = await billingAddressPage.verifyAddressDropdownOptions();
    if(newAddressOption) {
        await billingAddressPage.selectBillingAddress()
    }
    await billingAddressPage.fillBillingForm('', '', '', country, city, address1, zipCode, phone)
    await billingAddressPage.clickOnContinue();
    await shippingAddressPage.selectShippingAddress(address1);
    await shippingAddressPage.clickOnContinue();
    await shippingMethodPage.selectShippingOption('Ground');
    await shippingMethodPage.clickOnContinue();
    await paymentMethodpage.selectPaymentOption('CashOnDelivery');
    await paymentMethodpage.clickOnContinue();
    await paymentInfoPage.verifyCodText();
    await paymentInfoPage.clickOnContinue();
    await confirmOrderPage.verifyConfirmOrderTitle();
    await confirmOrderPage.verifyCartRowTotalsAndSubtotal();
    await confirmOrderPage.verifyCartSummaryCalculations();
    await confirmOrderPage.clickConfirmOrder();
    await orderCompletedPage.verifyOrderSuccess();
    await orderCompletedPage.getOrderNumber();
    await orderCompletedPage.clickOnContinue()
    // await page.close();
    // await browser.close();
})