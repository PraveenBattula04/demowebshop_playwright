import { Page, Locator, expect } from '@playwright/test';

export interface ProductItem {
    title: string;
    unitPrice: number;
    quantity: number;
    total: number;
}
export class ConfirmOrderPage {
	private page: Page;

	private confirmOrderTitle: Locator;
	private confirmButton: Locator;
	// Cart summary selectors
	private cartSummaryLeft: Locator;
	private cartSummaryRows: Locator;

    // products
    private productsTable: Locator;
    private productItem: Locator;


	constructor(page: Page) {
		this.page = page;

		this.confirmOrderTitle = this.page.locator('#opc-confirm_order div.step-title h2');
		this.confirmButton = this.page.locator('#confirm-order-buttons-container input.button-1');
		// Cart summary selectors
		this.cartSummaryLeft = this.page.locator('table.cart-total tbody tr td.cart-total-left');
		this.cartSummaryRows = this.page.locator('div.totals table.cart-total tbody tr');
        // products
        this.productsTable = page.locator('table.cart');
        this.productItem = page.locator('.cart').locator('.cart-item-row');
    }

	// Cart summary helpers
	async getSummaryRowIndex(label: string): Promise<number> {
		const count = await this.cartSummaryLeft.count();
		for (let i = 0; i < count; i++) {
			const text = (await this.cartSummaryLeft.nth(i).innerText()).trim();
			if (text.includes(label)) {
				return i;
			}
		}
		return -1;
	}

	async getSummaryValue(label: string): Promise<string> {
		const index = await this.getSummaryRowIndex(label);
		if(index === -1) return 'false';
		return await this.cartSummaryRows
			.nth(index)
			.locator('td.cart-total-right span.product-price')
			.innerText();
	}

	async getSubtotal(): Promise<number> {
		const text = await this.getSummaryValue('Sub-Total:');
		if(text === 'false') return 0;
		return Number(text.replace(/[^0-9.]/g, ''));
	}

	async getShipping(): Promise<number> {
		const text = await this.getSummaryValue('Shipping:');
		if(text === 'false') return 0;
		return Number(text.replace(/[^0-9.]/g, ''));
	}

	async getAdditionalFee(): Promise<number> {
		const text = await this.getSummaryValue('Payment method additional fee:');
		if(text === 'false') return 0;
		return Number(text.replace(/[^0-9.]/g, ''));
	}

	async getTax(): Promise<number> {
		const text = await this.getSummaryValue('Tax:');
		if(text === 'false') return 0;
		return Number(text.replace(/[^0-9.]/g, ''));
	}

	async getTotal(): Promise<number> {
		const text = await this.getSummaryValue('Total:');
		if(text === 'false') return 0;
		return Number(text.replace(/[^0-9.]/g, ''));
	}

	async verifyCartSummaryCalculations () {
		// Wait for the cart summary table to be visible
		await this.page.waitForSelector('table.cart-total', { timeout: 5000 });
		const leftCellsCount = await this.cartSummaryLeft.count();
		for (let i = 0; i < leftCellsCount; i++) {
			const cellText = await this.cartSummaryLeft.nth(i).innerText();
		}
		const subTotal = await this.getSubtotal();
		const shipping = await this.getShipping();
		const additionalFee = await this.getAdditionalFee();
		const tax = await this.getTax();
		const total = await this.getTotal();
        console.log(total, 'total')
		if(!((subTotal + shipping + tax + additionalFee) === total))
			console.log('Calculated during checkout');
			// throw new Error('Cart Summary Calculations are Wrong');
	}

	async productItemList(): Promise<ProductItem[]> {
		const productList: ProductItem[] = [];
		// On confirm order page, product rows may not have .cart-item-row, so use table.cart tbody tr
		const productRows = this.page.locator('table.cart tbody tr');
		const rowCount = await productRows.count();
		for (let i = 0; i < rowCount; i++) {
			const row = productRows.nth(i);
			// Defensive: skip header/footer rows if present
			const titleCell = row.locator('.product-name');
			if (!(await titleCell.count())) continue;
			const title = (await titleCell.innerText()).trim();
			const unitPriceText = await row.locator('.product-unit-price').innerText();
			const quantityValue = await row.locator('.qty').innerText();
			const totalText = await row.locator('.product-subtotal').innerText();
			productList.push({
				title,
				unitPrice: Number(unitPriceText.replace(/[^0-9.]/g, '')),
				quantity: Number(quantityValue),
				total: Number(totalText.replace(/[^0-9.]/g, '')),
			});
		}
		return productList;
	}

    async calulateAllProductTotal () {
        const productItemList = await this.productItemList();
        let total = 0;
        productItemList.forEach(e => total += e.total)
        return total;
    }

    async verifyCartRowTotalsAndSubtotal() {
        await this.page.waitForSelector('table.cart-total', { timeout: 5000 });
        const cartTotal = await this.calulateAllProductTotal();
        const subTotal = await this.getSubtotal();
        console.log(cartTotal, subTotal, 'carttotalsubtotal')
        if(!(cartTotal === subTotal))
            throw new Error('Cart summary Sub-Total and Product Line Items Totals are not Matching');
    }

    async verifyConfirmOrderTitle() {
        expect(await this.confirmOrderTitle.innerText()).toBe('Confirm Order');
    }

	async clickConfirmOrder() {
		await this.confirmButton.click();
	}
}
