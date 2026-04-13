
import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  private page: Page;

  productTitle: Locator;
  productPrice: Locator;
  addToCartButton: Locator;
  quantityBox: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productTitle = page.locator('div.product-name h1');
    this.productPrice = page.locator('div.product-price span');
    this.quantityBox = page.locator('input.qty-input');
    this.addToCartButton = page.locator('.add-to-cart-panel').locator('input[value="Add to cart"]');
  }

  async verifyProductTitle(expected: string) {
    expect(await this.productTitle.innerText()).toBe(expected);
  }

  async getPrice():Promise<number> {
    return Number(await this.productPrice.innerText());
  }

  async setQuantity(qty: number) {
    await this.quantityBox.fill(qty.toString());
  }

  async getQuantity(): Promise<number> {
    return Number(await this.quantityBox.innerText());
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  
async addItemToCart(expectedName: string, qty: number): Promise<number> {
    // 1️⃣ Verify product name
    await this.verifyProductTitle(expectedName);

    // 2️⃣ Set quantity
    await this.setQuantity(qty);

    // 3️⃣ Get price
    const price = await this.getPrice();

    // 4️⃣ Calculate total = price * qty
    const total = price * qty;

    // 5️⃣ Click Add to Cart
    await this.clickAddToCart();

    return total; // return total price for assertion in test
  }

}
