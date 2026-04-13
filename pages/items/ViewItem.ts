import { Page } from '@playwright/test';

export class ViewItem {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickToViewItem(itemName: string) {
    
    // if (!itemName || itemName.trim() === '') {
    //   console.log('Item name is empty. Skipping add to cart.');
    //   return;
    // }

    await this.page
      .locator('.product-item')                    // each product card
      .locator('.product-title')                   // product title
      .locator('a', { hasText: itemName })         // click item title
      .first()
      .click();
  }
}