import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class SecureArea extends BasePage {
    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoutButton = page.locator('.button', {hasText: 'Logout'});
    }

    async logout() {
        await this.logoutButton.click()
    }

    async checkSecureAreaPageOpened() {
        await expect(this.page).toHaveURL(/.*secure/);
    }

    async openSecureArea() {
        await this.page.goto('/secure');
    }
}