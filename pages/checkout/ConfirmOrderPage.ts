import { Page, Locator, expect } from '@playwright/test';

export class ConfirmOrderPage {
	private page: Page;

    private confirmOrderTitle: Locator;
	private confirmButton: Locator;
	private orderDetails: Locator;
	private orderSuccessMessage: Locator;
	private orderNumber: Locator;


	constructor(page: Page) {
		this.page = page;

        this.confirmOrderTitle = this.page.locator('#opc-confirm_order div.step-title h2')
		this.confirmButton = this.page.locator('#confirm-order-buttons-container input.button-1');
		this.orderDetails = this.page.locator('.order-details');
		this.orderSuccessMessage = this.page.locator('.section.order-completed .title');
		this.orderNumber = this.page.locator('.order-number');

	}

    async verifyConfirmOrderTitle() {
        expect(await this.confirmOrderTitle.innerText()).toBe('Confirm Order');
    }

	async clickConfirmOrder() {
		await this.confirmButton.click();
	}

	async getOrderSuccessMessage(): Promise<string> {
		return await this.orderSuccessMessage.textContent() ?? '';
	}

	async getOrderNumber(): Promise<string> {
		return await this.orderNumber.textContent() ?? '';
	}

	async verifyOrderSuccess() {
		await expect(this.orderSuccessMessage).toBeVisible();
		await expect(this.orderNumber).toBeVisible();
	}
}
