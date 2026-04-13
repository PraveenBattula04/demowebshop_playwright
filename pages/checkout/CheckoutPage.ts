import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPge {
    
    private page: Page
    private checkoutTitle: Locator;

    constructor(page: Page) {
        this.page = page
        this.checkoutTitle = this.page.locator('.page-title h1')
    }

    async verifyCheckoutTitle() {
        expect(await this.checkoutTitle.innerText()).toBe('Checkout');
    }
}