import { Page, Locator, expect } from "@playwright/test";

export class PaymentInfoPage {
    private page: Page;

    private codInfo: Locator;
    private continue: Locator;
    private back: Locator;
    
    constructor(page:Page) {
        this.page = page;
        this.codInfo = this.page.locator('#checkout-payment-info-load div.info tbody tr td p');
        this.continue = this.page.locator('#payment-info-buttons-container input.button-1');
        this.back = this.page.locator('#payment-info-buttons-container p.back-link').locator('a').filter({ hasText: 'Back' });

    }

    async verifyCodText() {
        expect(await this.codInfo.innerText()).toBe('You will pay by COD');
    }

    async clickOnContinue() {
        await this.continue.click();
    }

    async clickOnBack() {
        await this.back.click();
    }
}