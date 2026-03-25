import {Page, Locator } from '@playwright/test';

export class ReturningCustomer {
    public page: Page;

    // Locators
    public email: Locator;
    public password: Locator;
    public remembermeCheckbox: Locator;
    public forgotPasswordLink: Locator;
    public loginButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('.email');
        this.password = page.locator('#Password');
        this.remembermeCheckbox = page.locator('#RememberMe');
        this.forgotPasswordLink = page.locator('text=Forgot password?');
        this.loginButton = page.locator('input.button-1.login-button[value="Log in"]');
    }

    async returningCustomerfunc (var1: String) {
        switch(var1) {
            case 'email': return this.email;
            case 'password': return this.password;
            case 'remembermeCheckbox': return this.remembermeCheckbox;
            case 'forgotPasswordLink': return this.forgotPasswordLink;
            case 'loginButton': return this.loginButton;
            default: throw new Error(`Invalid header element: ${var1}`);
        }
    }
};