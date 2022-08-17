import { expect, Locator, Page } from '@playwright/test';

interface Style {
    backgroundColor: string,
    borderColor: string,
    badge: string
}

export class BasePage {
  readonly page: Page;
  readonly mainTitle: Locator;
  readonly footer: Locator;
  readonly footerLink: Locator;
  readonly successNotification: Locator;
  readonly successNotificationBadge: Locator;
  readonly errorNotification: Locator;
  readonly errorNotificationBadge: Locator;
  readonly closeNotificationButton: Locator;
  readonly advBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainTitle = page.locator('h2');
    this.footer = page.locator('#page-footer');
    this.footerLink = page.locator('#page-footer a');
    this.successNotification = page.locator('#flash.success');
    this.successNotificationBadge = page.locator('.success::before');
    this.errorNotification = page.locator('#flash.error');
    this.errorNotificationBadge = page.locator('.error::before');
    this.closeNotificationButton = page.locator('.close');
    this.advBanner = page.locator('img');
  }

  async clickOnFotterLink() {
    await this.footerLink.click();
  }

  async getFooterText() {
    return await this.footer.textContent();
  }

  async clickOnAdvBanner() {
    await this.advBanner.click();
  }

  async closeNotification() {
    await this.closeNotificationButton.click();
  }

  async getNotificationStyle(locator: Locator) {
    const backgroundColor = await locator.evaluate((element) => {
        window.getComputedStyle(element).getPropertyValue('background-color');
    });
    const borderColor = await locator.evaluate((element) => {
        window.getComputedStyle(element).getPropertyValue('border-color');
    });
    const badge = await locator.filter({has: this.page.locator('::before')}).evaluate((element) => {
        window.getComputedStyle(element).getPropertyValue('content');
    });
    return {backgroundColor, borderColor, badge};

  }

  async checkErrorNotificationStyle(expectedErrorStyle: Style) {
    const style = await this.getNotificationStyle(this.errorNotification);

    expect(style.backgroundColor).toBe(expectedErrorStyle.backgroundColor);
    expect(style.borderColor).toBe(expectedErrorStyle.borderColor);
    expect(style.badge).toBe(expectedErrorStyle.badge);
  }

  async checkErrorNotificationText(message: string) {
    const errorText = await this.errorNotification.textContent();
    expect(errorText).toBe(message);
  }

  async checkSuccessNotificationStyle(expectedSuccessStyle: Style) {
    const style = await this.getNotificationStyle(this.successNotification);

    expect(style.backgroundColor).toBe(expectedSuccessStyle.backgroundColor);
    expect(style.borderColor).toBe(expectedSuccessStyle.borderColor);
    expect(style.badge).toBe(expectedSuccessStyle.badge);

  }


}
