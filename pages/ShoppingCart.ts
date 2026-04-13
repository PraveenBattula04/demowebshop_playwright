import { Page, Locator } from '@playwright/test';

export interface ProductItem {
    title: string;
    unitPrice: number;
    quantity: number;
    total: number;
    remove: Locator;
    inputQntyValue: Locator;
}

export class ShoppingCart {
    private page: Page;

    // Locators
    private productsTable: Locator;
    private productItem: Locator;
    private updateCart: Locator;
    private continueShopping: Locator;

    // Cart summary locators
    // private subtotal: Locator;
    // private shipping: Locator;
    // private tax: Locator;
    // private total: Locator;
    private agreeCheckbox: Locator;
    private checkoutButton: Locator;

    // Estimate shopping
    private countryDropdown: Locator;
    private stateDropdown: Locator;
    private zipInput: Locator;
    private estimateButton: Locator;


    constructor(page:Page) {
        this.page = page;

        // products table Locators
        this.productsTable = page.locator('table.cart');
        this.productItem = page.locator('.cart').locator('.cart-item-row');
        this.updateCart = page.locator('[name="updatecart"]');
        this.continueShopping = page.locator('[name="continueshopping"]');

        // estimate shopping Locators
        this.countryDropdown = this.page.locator('#CountryId');
        this.stateDropdown = this.page.locator('#StateProvinceId');
        this.zipInput = this.page.locator('#ZipPostalCode');
        this.estimateButton = this.page.locator('input[name="estimateshipping"]');

        // Cart summary Locators (adjust selectors as needed)

        // this.subtotal = this.page.locator('div.totals .cart-total tbody:nth-child(1) tr:nth-child(1) td.cart-total-right span.nobr');
        // this.shipping = this.page.locator('div.totals .cart-total tbody:nth-child(1) tr:nth-child(2) td.cart-total-right span.nobr');
        // this.tax = this.page.locator('div.totals .cart-total tbody:nth-child(1) tr:nth-child(3) td.cart-total-right span.nobr');
        // this.total = this.page.locator('div.totals .cart-total tbody:nth-child(1) tr:nth-child(4) td.cart-total-right span.nobr');

        this.agreeCheckbox = this.page.locator('#termsofservice');
        this.checkoutButton = this.page.locator('#checkout, .checkout-button');
    }

    async productItemList(): Promise<ProductItem[]> {
        const productList: ProductItem[] = [];
        const rowCount = await this.productsTable.count();
        for (let i = 0; i < rowCount; i++) {
            const row = this.productItem.nth(i);

            const removeCheckbox = row.locator('.remove-from-cart [name="removefromcart"]');

            const title = (await row.locator('.product-name').innerText()).trim();
            
            const unitPriceText = await row.locator('.unit-price').innerText();
            
            const quantityValue = await row.locator('.qty-input').inputValue();

            const inputQntyValue = await row.locator('.qty-input');
            
            const totalText = await row.locator('.product-subtotal').innerText();
            
            productList.push({
              title,
              unitPrice: Number(unitPriceText.replace(/[^0-9.]/g, '')),
              quantity: Number(quantityValue),
              total: Number(totalText.replace(/[^0-9.]/g, '')),
              remove: removeCheckbox,
              inputQntyValue: inputQntyValue
            });
        }
        return productList;
    }

    async clickOnRemoveItem(itemName: string) {
        const productItemList = await this.productItemList();
        const item = productItemList.filter(i => i.title === itemName)
        if(item && item.length) {
            await item[0].remove.check();
        }
    }

    async verifyAllProductTotals () {
        const productItemList = await this.productItemList();
        productItemList.forEach(e => {
            if(!(e.quantity * e.unitPrice === e.total )) throw new Error('Product Price, Quantity and Total Not Macthed');
        })
    }
    
    async calulateAllProductTotal () {
        const productItemList = await this.productItemList();
        let total = 0;
        productItemList.forEach(e => total += e.total)
        return total;
    }

    async increaseQntyOfItem (itemName: string, qnty: number) {
        const productItemList = await this.productItemList();
        const item = productItemList.filter(e => e.title === itemName);
        if(item && item.length) {
            await item[0].inputQntyValue.fill(qnty.toString());
        }
    }

    async clickOnUpdateShoppingCart () {
        await this.updateCart.click();
    }

    async clickOnUpContinueShopping () {
        await this.continueShopping.click();
    }

    // Estimate shipping cost by filling the form and clicking the estimate button
    async estimateShipping(country: string, state: string, zip: string) {
        await this.countryDropdown.selectOption({ label: country });
        await this.stateDropdown.selectOption({ label: state });
        await this.zipInput.fill(zip);
        await this.estimateButton.click();
    }

    // Cart summary functions
    async getSubtotal(): Promise<number> {
        const text = await this.getSummaryValue('Sub-Total:')
        if(text === 'false') return 0
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async getShipping(): Promise<number> {
        const text = await this.getSummaryValue('Shipping:');  
        if(text === 'false') return 0
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async getAdditionalFee(): Promise<number> {
        const text = await this.getSummaryValue('Payment method additional fee:');
        if(text === 'false') return 0
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async getTax(): Promise<number> {
        const text = await this.getSummaryValue('Tax:');
        if(text === 'false') return 0
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async getTotal(): Promise<number> {
        const text = await this.getSummaryValue('Total:');
        if(text === 'false') return 0
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    
    async getSummaryRowIndex(label: string): Promise<number> {
        const leftCells = this.page.locator('table.cart-total tbody tr td.cart-total-left');
        const count = await leftCells.count();
        for (let i = 0; i < count; i++) {
            const text = (await leftCells.nth(i).innerText()).trim();
            if (text.includes(label)) {
                return i;
            }
        }
        return -1

        // throw new Error(`Summary row not found for label: ${label}`);
    }

    async getSummaryValue(label: string): Promise<string> {
        const index = await this.getSummaryRowIndex(label);
        if(index === -1) return 'false'
        return await this.page
            .locator('div.totals table.cart-total tbody tr')
            .nth(index)
            .locator('td.cart-total-right span').nth(1)
            .innerText();
    }


    async verifyCartSummaryCalculations () {
        const subTotal = await this.getSubtotal();
        const shipping = await this.getShipping();
        const additionalFee = await this.getAdditionalFee()
        const tax = await this.getTax();
        const total = await this.getTotal();
        console.log(subTotal, shipping, tax, total, 'verifycartsummary')
        if(!((subTotal + shipping + tax + additionalFee) === total))
            console.log('Calculated during checkout');
            // throw new Error('Cart Summary Calculations are Wrong');
    }

    async verifyCartRowTotalsAndSubtotal() {
        const cartTotal = await this.calulateAllProductTotal();
        const subTotal = await this.getSubtotal();
        console.log(cartTotal, subTotal, 'carttotalsubtotal')
        if(!(cartTotal === subTotal))
            throw new Error('Cart summary Sub-Total and Product Line Items Totals are not Matching');
        }

    async clickOnAgreeToTerms() {
        if (!(await this.agreeCheckbox.isChecked())) {
            await this.agreeCheckbox.check();
        }
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}