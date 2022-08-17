import { expect, Locator, Page } from '@playwright/test';

interface Style {
    backgroundColor: string,
    borderColor: string,
    color: string
}

export class BasePage {
  readonly page: Page;
  readonly mainTitle: Locator;
  readonly subheader: Locator;
  readonly footer: Locator;
  readonly footerLink: Locator;
  readonly successNotification: Locator;
  readonly successNotificationBadge: Locator;
  readonly errorNotification: Locator;
  readonly closeNotificationButton: Locator;
  readonly advBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainTitle = page.locator('h2');
    this.subheader = page.locator('.subheader');
    this.footer = page.locator('#page-footer');
    this.footerLink = page.locator('#page-footer a');
    this.successNotification = page.locator('#flash.success');
    this.successNotificationBadge = page.locator('.success::before');
    this.errorNotification = page.locator('#flash.error');
    this.closeNotificationButton = page.locator('.close');
    this.advBanner = page.locator('img');
  }

  async clickOnFotterLink() {
    await this.footerLink.click();
  }

  async getFooterText() {
    const footerText = await this.footer.textContent();
    return footerText?.trim();
  }

  async getMainTitleText() {
    const mainTitleText = await this.mainTitle.textContent();
    return mainTitleText?.trim();
  }

  async clickOnAdvBanner() {
    await this.advBanner.click();
  }

  async closeNotification() {
    await this.closeNotificationButton.click();
  }

  async getElementStyle(locator: Locator) {
    const backgroundColor = await locator.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue('background-color')
    });
    const borderColor = await locator.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue('border-color');
    });
    const color = await locator.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue('color');
    });
    return {backgroundColor, borderColor, color};
  }

  async checkErrorNotificationStyle(expectedErrorStyle: Style) {
    const style = await this.getElementStyle(this.errorNotification);

    expect(style.backgroundColor).toBe(expectedErrorStyle.backgroundColor);
    expect(style.borderColor).toBe(expectedErrorStyle.borderColor);
    expect(style.color).toBe(expectedErrorStyle.color);
  }

  async checkErrorNotificationText(message: string) {
    await expect(this.errorNotification).toContainText(message);
  }

  async checkSuccessNotificationStyle(expectedSuccessStyle: Style) {
    const style = await this.getElementStyle(this.successNotification);

    expect(style.backgroundColor).toBe(expectedSuccessStyle.backgroundColor);
    expect(style.borderColor).toBe(expectedSuccessStyle.borderColor);
    expect(style.color).toBe(expectedSuccessStyle.color);
  }

  async checkSuccessNotificationText(message: string) {
    await expect(this.successNotification).toContainText(message);
  }
}
