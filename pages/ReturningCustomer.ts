import {Page, Locator, expect } from '@playwright/test';

export class ReturningCustomer {
    private page: Page;

    // Locators
    private email: Locator;
    private password: Locator;
    private remembermeCheckbox: Locator;
    private forgotPasswordLink: Locator;
    private loginButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('.email');
        this.password = page.locator('#Password');
        this.remembermeCheckbox = page.locator('#RememberMe');
        this.forgotPasswordLink = page.locator('text=Forgot password?');
        this.loginButton = page.locator('input.button-1.login-button[value="Log in"]');
    }

    // returningCustomerfunc (var1: String) {
    //     switch(var1) {
    //         case 'email': return this.email;
    //         case 'password': return this.password;
    //         case 'remembermeCheckbox': return this.remembermeCheckbox;
    //         case 'forgotPasswordLink': return this.forgotPasswordLink;
    //         case 'loginButton': return this.loginButton;
    //         default: throw new Error(`Invalid header element: ${var1}`);
    //     }
    // }

    async login(email: string, password: string, rememberMeCheck: Boolean) {
        await expect(this.email).toBeVisible();
        await this.email.fill(email);
        await this.password.fill(password);
        if(rememberMeCheck) await this.remembermeCheckbox.check();
        await this.remembermeCheckbox.uncheck();
        await this.loginButton.click();
    }
};