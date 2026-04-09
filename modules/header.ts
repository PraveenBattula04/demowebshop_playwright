import {Page, Locator } from '@playwright/test';

export class Header {
    private page: Page;

    // Locators
    public logo: Locator;
    public registerLink: Locator;
    public loginLink: Locator;
    public shoppingCartLink: Locator;
    public wishlistLink: Locator;
    public wishlistQnty: Locator;
    public searchStoreBox: Locator;
    public searchButton: Locator;
    public shoppingCartQnty: Locator;
    

    constructor(page: Page) {
        this.page = page;

        this.logo = page.locator('text=Tricentis Demo Web Shop');
        this.registerLink = page.locator('text=Register');
        this.loginLink = page.locator('.ico-login');
        this.shoppingCartLink = page.locator('.cart-label').locator('text=Shopping cart');
        this.shoppingCartQnty = page.locator('.cart-qty');
        this.wishlistLink = page.locator('cart-label').locator('Wishlist');
        this.wishlistQnty = page.locator('wishlist-qty');
        this.searchStoreBox = page.locator('#small-searchterms');
        this.searchButton = page.locator('input[value="Search"]');
    }

    headerfunc (var1: String) {
        switch(var1) {
            case 'logo': return this.logo;
            case 'registerLink': return this.registerLink;
            case 'loginLink': return this.loginLink;
            case 'shoppingCartLink': return this.shoppingCartLink;
            case 'wishlistLink': return this.wishlistLink;
            case 'searchStoreBox': return this.searchStoreBox;
            case 'searchButton': return this.searchButton;
            case 'shoppingCartQnty': return this.shoppingCartQnty;
            case 'wishlistQnty': return this.wishlistQnty;
            default: throw new Error(`Invalid header element: ${var1}`);
        }
    }
};