import {Page, Locator} from '@playwright/test';

export class PaymentMethodPage {

    private page: Page;

    private cashOnDelivery: Locator;
    private checkMoneyOrder: Locator;
    private creditCard: Locator;
    private purchaseOrder: Locator;
    private continue: Locator;
    private back: Locator;

    // Locators
    constructor (page: Page) {
        this.page = page

        this.cashOnDelivery = this.page.locator('#paymentmethod_0');
        this.checkMoneyOrder = this.page.locator('#paymentmethod_1');
        this.creditCard = this.page.locator('#paymentmethod_2');
        this.purchaseOrder = this.page.locator('#paymentmethod_3');
        this.continue = this.page.locator('#payment-method-buttons-container input.button-1');
        this.back = this.page.locator('#payment-method-buttons-container p.back-link').locator('a').filter({ hasText: 'Back' });
    }

    async selectPaymentOption(option: 'CashOnDelivery' | 'CheckMoneyOrder' | 'CreditCard' | 'PurchaseOrder') {
        switch (option) {
            case 'CashOnDelivery':
            await this.cashOnDelivery.check();
            break;

            case 'CheckMoneyOrder':
            await this.checkMoneyOrder.check();
            break;

            case 'CreditCard':
            await this.creditCard.check();
            break;

            case 'PurchaseOrder':
            await this.purchaseOrder.check();
            break;

            default:
            throw new Error(`Invalid payment option: "${option}". 
                Valid options: Cash on Delivery, Check / Money Order, Credit Card, Purchase Order`);
        }
    }

    async clickOnContinue() {
        await this.continue.click();
    }

    async clickOnBack() {
        await this.back.click();
    }
}