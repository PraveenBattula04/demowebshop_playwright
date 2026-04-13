import { Locator, Page, expect } from '@playwright/test';

export class BillingAddressPage {

    private page: Page;

    private selectOption: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private email: Locator;
    private country: Locator;
    private city: Locator;
    private address1: Locator;
    private zipCode: Locator;
    private phone: Locator;


  constructor(page: Page) {
    this.page = page;
    this.selectOption = this.page.locator('#billing-address-select')
    this.firstName = this.page.locator('#BillingNewAddress_FirstName');
    this.lastName = this.page.locator('#BillingNewAddress_LastName');
    this.email = this.page.locator('#BillingNewAddress_Email');
    this.country = this.page.locator('#BillingNewAddress_CountryId');
    this.city = this.page.locator('#BillingNewAddress_City');
    this.address1 = this.page.locator('#BillingNewAddress_Address1');
    this.zipCode = this.page.locator('#BillingNewAddress_ZipPostalCode');
    this.phone = this.page.locator('#BillingNewAddress_PhoneNumber');
  }

  async selectBillingAddress(optionText: string = 'New Address') {
    const option = this.page
    .locator('#billing-address-select option')
    .filter({ hasText: optionText })
    .first();
    const value = await option.getAttribute('value');
    await this.page.selectOption('#billing-address-select', value);
  }

  async verifyAddressDropdownOptions () {
    return await this.selectOption.isVisible();
  }

  async fillBillingForm(first: string, last: string, email: string, country: string, city: string, address: string, zip: string, phone: string) {
    
    // Helper function to handle validation + filling
    const fillField = async (locator: Locator, value: string, fieldName: string) => {
      const existingValue = await locator.inputValue().catch(() => '');
    
      if (!value || value.trim() === '') {
        // If empty but field does not have a value → error
        if (existingValue && existingValue.trim() === '') {
          throw new Error(`"${fieldName}" cannot be empty.`);
        }
        // else: empty & field empty → skip
        return;
      }
    
      // If value exists → fill
      await locator.fill(value);
    };

    // check if fields are visible or not
    await this.firstName.isVisible();

    await fillField(this.firstName, first, 'First Name');
    await fillField(this.lastName, last, 'Last Name');
    await fillField(this.email, email, 'Email');
    await fillField(this.city, city, 'City');
    await fillField(this.address1, address, 'Address');
    await fillField(this.zipCode, zip, 'Zip Code');
    await fillField(this.phone, phone, 'Phone Number');
  
    // Special handling for dropdown
    const existingCountry = await this.country.inputValue();
  
    if (!country || country.trim() === '') {
      if (existingCountry && existingCountry.trim() === '') {
        throw new Error('Country cannot be empty');
      }
      // skip
    } else {
      await this.country.selectOption({ label: country });
    }
  }

  async clickOnContinue() {
    await this.page.locator('#billing-buttons-container input.button-1').click();
  }
}
