import {Page} from '@playwright/test';

export class ItemCategories {
  private page: Page;

  // ONE place where UI text is maintained
  private categories: Record<string, string> = {
    books: 'Books',
    computers: 'Computers',
    electronics: 'Electronics',
    apparelandshoes: 'Apparel & Shoes',
    digital: 'Digital downloads',
    jewelry: 'Jewelry',
    giftcards: 'Gift Cards'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnCategory(categoryKey: string) {
    const uiText = this.categories[categoryKey.toLowerCase()];
    if (!uiText) {
      throw new Error(
        `Invalid category "${categoryKey}". Valid keys: ${Object.keys(this.categories).join(', ')}`
      );
    }
    await this.page.locator('.top-menu').getByRole('link', { name: uiText }).isVisible();
    await this.page.locator('.top-menu').getByRole('link', { name: uiText }).click();
  }
}

// export class ItemCategories {

//     private page: Page;

//     // Locators
//     private books: Locator;
//     private computers: Locator;
//     private electronics: Locator;
//     private apparelAndShoes: Locator;
//     private digitalDownloads: Locator;
//     private jewelry: Locator;
//     private giftCards: Locator;

//     constructor(page: Page) {
//         this.page = page;

//         // :text() matches elements containing the text
//         // used :text() because the elemnet contains spaces. So, used 
//         this.books = page.locator('.top-menu').locator(':text("BOOKS")');
//         this.computers = page.locator('.top-menu').locator(':text("Computers")');
//         this.electronics = page.locator('.top-menu').locator(':text("Electronics")');
//         this.apparelAndShoes = page.locator('.top-menu').locator(':text("Apparel & Shoes")');
//         this.digitalDownloads = page.locator('.top-menu').locator(':text("Digital downloads")');
//         this.jewelry = page.locator('.top-menu').locator(':text("Jewelry")');
//         this.giftCards = page.locator('.top-menu').locator(':text("Gift Cards")');
//     }

//     async clickOnBooks () {
//         await this.books.click();
//     }
//     async clickOnComputers () {
//         await this.computers.click();
//     }
//     async clickOnElectronics () {
//         await this.electronics.click();
//     }
//     async clickOnApparelAndShoes () {
//         await this.apparelAndShoes.click();
//     }
//     async clickOnDigitalDownloads () {
//         await this.digitalDownloads.click();
//     }
//     async clickOnJewelry () {
//         await this.jewelry.click();
//     }
//     async clickOnGiftCards () {
//         await this.giftCards.click();
//     }
// }