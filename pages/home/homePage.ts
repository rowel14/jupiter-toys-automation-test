import { Page } from "@playwright/test";
import BasePage from "../basePage";

export default class HomePage extends BasePage {
  readonly subUrl = "/#/home";

  constructor(page: Page) {
    super(page);
    this.baseSelector = page.getByRole("heading", { name: "Jupiter Toys" });
  }

  async navigateToHomePage(): Promise<void> {
    await this.navigateTo(this.subUrl);
  }
}
