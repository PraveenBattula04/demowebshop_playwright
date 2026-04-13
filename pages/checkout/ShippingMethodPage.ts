import {Page, Locator} from '@playwright/test';

export class ShippingMethodPage {

    private page: Page;

    private ground: Locator;
    private nextDayAir: Locator;
    private secondDayAir: Locator;
    private continue: Locator;
    private back: Locator;

    // Locators
    constructor (page: Page) {
        this.page = page;
        // Adjust selectors as per your actual shipping method radio buttons
        this.ground = this.page.locator('#shippingoption_0');
        this.nextDayAir = this.page.locator('#shippingoption_1');
        this.secondDayAir = this.page.locator('#shippingoption_2');
        this.continue = this.page.locator('#shipping-method-buttons-container input.button-1');
        this.back = this.page.locator('#shipping-method-buttons-container p.back-link').locator('a').filter({ hasText: 'Back' });
    }

    async selectShippingOption(option: 'Ground' | 'NextDayAir' | 'SecondDayAir') {
        switch (option) {
            case 'Ground':
                await this.ground.check();
                break;
            case 'NextDayAir':
                await this.nextDayAir.check();
                break;
            case 'SecondDayAir':
                await this.secondDayAir.check();
                break;
            default:
                throw new Error(`Invalid shipping option: "${option}".\nValid options: Ground, NextDayAir, SecondDayAir`);
        }
    }

    async clickOnContinue() {
        await this.continue.click();
    }

    async clickOnBack() {
        await this.back.click();
    }
}