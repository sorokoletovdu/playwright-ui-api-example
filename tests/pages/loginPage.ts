import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class Login extends BasePage {
    readonly usernameInput: Locator;
    readonly usernameInputHeader: Locator;
    readonly passwordInput: Locator;
    readonly passwordInputHeader: Locator;
    readonly loginButton: Locator;
    readonly defaultUsername: Locator;
    readonly defaultPassword: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#username');
        this.usernameInputHeader = page.locator('[for="username"]');
        this.passwordInput = page.locator('#password');
        this.passwordInputHeader = page.locator('[for="password"]');
        this.loginButton = page.locator('[type="submit"]');
        this.defaultUsername = page.locator('h4 em:nth-child(1)');
        this.defaultPassword = page.locator('h4 em:nth-child(2)');
    }

    async getDefaultUsername() {
        return await this.defaultUsername.textContent();
    }

    async getDefaultPassword() {
        return await this.defaultPassword.textContent();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }

    async checkLoginPageOpened() {
        await expect(this.page).toHaveURL(/.*login/);
    }

    async openLoginPage() {
        await this.page.goto('/login');
    }

    async checkLoginButtonStyle() {
        const style = await this.getElementStyle(this.loginButton);

        await expect(style.backgroundColor).toBe('rgb(43, 166, 203)');
        await expect(style.borderColor).toBe('rgb(34, 132, 161)');
        await expect(style.color).toBe('rgb(255, 255, 255)');
    }
}