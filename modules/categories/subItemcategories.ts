
import { Page } from '@playwright/test';

export class SubItemsCategories {
  private page: Page;

  // One central list of UI text mapped to internal keys
  private subCategories: Record<string, string> = {
    desktops: 'Desktops',
    notebooks: 'Notebooks',
    accessories: 'Accessories',
    cameraAndPhoto: 'Camera, photo',
    cellphones: 'Cell phones'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnSubCategory (subCategoryKey: string) {
    const uiText = this.subCategories[subCategoryKey.toLowerCase()];
    if(!subCategoryKey) {
        console.log('sub category does not exist');
        return;
    }

    if (!uiText) {
      throw new Error(
        `Invalid subcategory "${subCategoryKey}". Valid keys: ${Object.keys(this.subCategories).join(', ')}`
      );
    }

    await this.page
      .locator('.item-box')               // Parent container
      .locator('a', { hasText: uiText })  // Dynamic UI text lookup
      .first()
      .click();
  }
}
