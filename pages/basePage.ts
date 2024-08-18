import { Locator, type Page } from "@playwright/test";

export default class BasePage {
  readonly page: Page;
  protected baseSelector: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.isPageLoaded();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForElement(selector: Locator): Promise<void> {
    await selector.waitFor({ state: "visible" });
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async isPageLoaded(): Promise<void> {
    await this.waitForElement(this.baseSelector);
  }
}
