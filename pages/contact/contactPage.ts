import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage";

export default class ContactPage extends BasePage {
  readonly subUrl = "/#/contact";
  readonly emailField: Locator;
  readonly forenameField: Locator;
  readonly submitButton: Locator;
  readonly surnameField: Locator;
  readonly telephoneField: Locator;
  readonly messageField: Locator;
  readonly successSubmissionAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.baseSelector = page.locator("//label[contains(text(),'Forename')]");
    this.emailField = page.locator("#email");
    this.forenameField = page.locator("#forename");
    this.submitButton = page.locator("a", { hasText: "Submit" });
    this.surnameField = page.locator("#surname");
    this.telephoneField = page.locator("#telephone");
    this.messageField = page.locator("#message");
    this.successSubmissionAlert = page.locator(".alert-success");
  }

  async getFormFieldErrorMessage(fieldName: string): Promise<string | null> {
    try {
      switch (fieldName) {
        case "Forename":
          const forenameErrorSpan = this.page.locator("#forename-err");
          return (await forenameErrorSpan.isVisible())
            ? forenameErrorSpan?.innerText()
            : null;

        case "Email":
          const emailErrorSpan = this.page.locator("#email-err");
          return (await emailErrorSpan.isVisible())
            ? emailErrorSpan?.innerText()
            : null;

        case "Message":
          const messageErrorSpan = this.page.locator("#message-err");
          return (await messageErrorSpan.isVisible())
            ? messageErrorSpan?.innerText()
            : null;

        default:
          return null;
      }
    } catch (error) {
      return null;
    }
  }

  async getSuccessfulSubmissionMessage(): Promise<string | null> {
    await this.waitForElement(this.successSubmissionAlert);
    return this.successSubmissionAlert.textContent();
  }

  async inputFormField(fieldName: string, value: string): Promise<void> {
    switch (fieldName) {
      case "Email":
        await this.emailField.fill(value);
        break;

      case "Forename":
        await this.forenameField.fill(value);
        break;

      case "Message":
        await this.messageField.fill(value);
        break;

      case "Surname":
        await this.surnameField.fill(value);
        break;

      case "Telephone":
        await this.telephoneField.fill(value);
        break;

      default:
        break;
    }
  }

  async submitContactForm(): Promise<void> {
    await this.submitButton.click();
  }

  async navigateToContactPage(): Promise<void> {
    await this.navigateTo(this.subUrl);
  }
}
