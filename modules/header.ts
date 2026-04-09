import {Page, Locator, expect } from '@playwright/test';

export class Header {
    private page: Page;

    // Locators
    private logo: Locator;
    private registerLink: Locator;
    private loginLink: Locator;
    private shoppingCartLink: Locator;
    private wishlistLink: Locator;
    private wishlistQnty: Locator;
    private searchStore: Locator;
    private searchButton: Locator;
    private shoppingCartQnty: Locator;
    private logoutButton: Locator;
    private userLoggedIn: Locator;
    

    constructor(page: Page) {
        this.page = page;

        this.logo = page.locator('text=Tricentis Demo Web Shop');
        this.registerLink = page.locator('text=Register');
        this.loginLink = page.locator('.ico-login');
        this.shoppingCartLink = page.locator('.cart-label').locator('text=Shopping cart');
        this.shoppingCartQnty = page.locator('.cart-qty');
        this.wishlistLink = page.locator('cart-label').locator('Wishlist');
        this.wishlistQnty = page.locator('.wishlist-qty');
        this.searchStore = page.locator('#small-searchterms');
        this.searchButton = page.locator('input[value="Search"]');
        this.logoutButton = page.locator('.ico-logout');
        this.userLoggedIn = page.locator('.header-links').locator('.account');

    }

    async ClickOnRegisterLink () {
        await this.registerLink.click();
    }
    async ClickOnLoginLink () {
        await this.loginLink.click();
    }
    async ClickOnShoppingCartLink () {
        await this.shoppingCartLink.click();
    }
    async ClickOnWishlistLink () {
        await this.wishlistLink.click();
    }
    async ClickOnSearchStore () {
        await this.searchStore.click();
    }
    async ClickOnSearchButton () {
        await this.searchButton.click();
    }
    async getShoppingCartQnty () {
        let temp = await this.shoppingCartQnty.innerText();
        return Number(temp.replace(/[()]/g, ''))
    }
    async getWishlistQnty () {
        let temp = await this.wishlistQnty.innerText();
        return Number(temp.replace(/[()]/g, ''))
    }

    async clickOnLogout () {
        await this.logoutButton.click();
    }

    async getUserLoggedIn () {
        return await this.userLoggedIn.innerText();
    }

    async verifyLoggedInEmail (expectedEmail: string) {
        const displayedEmail = await this.getUserLoggedIn();
        await expect(displayedEmail).toBe(expectedEmail);
    }
    
};