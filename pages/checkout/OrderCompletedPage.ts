import { Page, Locator, expect } from '@playwright/test';


export class OrderCompletedPage {
    private page: Page;

    private orderDetailsLink: Locator;
    private orderSuccessMessage: Locator;
    private orderNumber: Locator;
    private continue: Locator;

    constructor(page: Page) {
        this.page = page;

        this.orderDetailsLink = this.page.locator(':text("Click here for order details.")');
        this.orderSuccessMessage = this.page.locator('.section.order-completed .title strong');
        this.orderNumber = this.page.locator('ul.details li').first();
        this.continue = this.page.locator('.buttons input.button-2');
    }

    async clickOnOrderDetailsLink() {
        await this.orderDetailsLink.click();
    }

    async getOrderSuccessMessage(): Promise<string> {
        return await this.orderSuccessMessage.innerText() ?? '';
    }

    async getOrderNumber(): Promise<string> {
        const text = await this.orderNumber.innerText() ?? '';
        console.log(text)
        // removes all Non digits
        return text.replace(/\D/g, '');
    }

    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toBeVisible();
        await expect(this.orderNumber).toBeVisible();
    }

    async clickOnContinue() {
        await this.continue.click();
    }
}
