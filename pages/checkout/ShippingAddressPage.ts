
import { Locator, Page, expect } from '@playwright/test';

export class ShippingAddressPage {

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
    private continue: Locator;
    private back: Locator;
    private inStorePickup: Locator;


  constructor(page: Page) {
    this.page = page;
    this.selectOption = this.page.locator('#shipping-address-select');
    this.firstName = this.page.locator('#ShippingNewAddress_FirstName');
    this.lastName = this.page.locator('#ShippingNewAddress_LastName');
    this.email = this.page.locator('#ShippingNewAddress_Email');
    this.country = this.page.locator('#ShippingNewAddress_CountryId');
    this.city = this.page.locator('#ShippingNewAddress_City');
    this.address1 = this.page.locator('#ShippingNewAddress_Address1');
    this.zipCode = this.page.locator('#ShippingNewAddress_ZipPostalCode');
    this.phone = this.page.locator('#ShippingNewAddress_PhoneNumber');
    this.continue = this.page.locator('#shipping-buttons-container input.button-1');
    this.back = this.page.locator('#shipping-buttons-container p.back-link').locator('a').filter({ hasText: 'Back' });
    this.inStorePickup = this.page.locator('#PickUpInStore');
  }

  async selectShippingAddress(optionText: string = 'New Address') {
    const option = this.page
      .locator('#shipping-address-select option')
      .filter({ hasText: optionText })
      .first();
    const value = await option.getAttribute('value');
    await this.page.selectOption('#shipping-address-select', value);
  }

  async verifyAddressDropdownOptions () {
    return await this.selectOption.isVisible();
  }

  async fillShippingForm(first: string, last: string, email: string, country: string, city: string, address: string, zip: string, phone: string) {
    // Helper function to handle validation + filling
    const fillField = async (locator: Locator, value: string, fieldName: string) => {
      const existingValue = await locator.inputValue().catch(() => '');
      if (!value || value.trim() === '') {
        if (existingValue && existingValue.trim() === '') {
          throw new Error(`"${fieldName}" cannot be empty.`);
        }
        return;
      }
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
    await this.continue.click();
  }

  async clickOnBack() {
    await this.back.click();
  }

  async clickOnInStorePickup() {
    await this.inStorePickup.check();
  }
}
