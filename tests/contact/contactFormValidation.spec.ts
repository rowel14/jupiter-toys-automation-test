import { test, expect } from "@playwright/test";
import HomePage from "../../pages/home/homePage";
import ContactPage from "../../pages/contact/contactPage";
import { CONTACT_FORM_ERROR_MESSAGES } from "../../constants/pageConstants";

test.describe("Contact Form Validation Tests", () => {
  test("should check contact form validation errors", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();

    const contactPage = new ContactPage(page);
    await contactPage.navigateToContactPage();
    await contactPage.submitContactForm();

    let forenameError = await contactPage.getFormFieldErrorMessage("Forename");
    let emailError = await contactPage.getFormFieldErrorMessage("Email");
    let messageError = await contactPage.getFormFieldErrorMessage("Message");

    expect(forenameError).toBe(
      CONTACT_FORM_ERROR_MESSAGES.find(
        (e) => e.errorType === "ForenameRequired"
      )?.errorMessage
    );

    expect(emailError).toBe(
      CONTACT_FORM_ERROR_MESSAGES.find((e) => e.errorType === "EmailRequired")
        ?.errorMessage
    );

    expect(messageError).toBe(
      CONTACT_FORM_ERROR_MESSAGES.find((e) => e.errorType === "MessageRequired")
        ?.errorMessage
    );

    await contactPage.inputFormField("Forename", "Rowel");
    await contactPage.inputFormField("Email", "row@example.com");
    await contactPage.inputFormField("Message", "Test");

    forenameError = await contactPage.getFormFieldErrorMessage("Forename");
    emailError = await contactPage.getFormFieldErrorMessage("Email");
    messageError = await contactPage.getFormFieldErrorMessage("Message");

    expect(forenameError).toBeNull();
    expect(emailError).toBeNull();
    expect(messageError).toBeNull();
  });
});
