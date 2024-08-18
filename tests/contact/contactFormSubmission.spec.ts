import { test, expect } from "@playwright/test";
import HomePage from "../../pages/home/homePage";
import ContactPage from "../../pages/contact/contactPage";

test.describe("Contact Form Submission", () => {
  const forename = "Rowel";
  const email = "rowtest@example.com";
  const message = "all goods!";

  test("should check successful submission of contact form", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();

    const contactPage = new ContactPage(page);
    await contactPage.navigateToContactPage();

    await contactPage.inputFormField("Forename", forename);
    await contactPage.inputFormField("Email", email);
    await contactPage.inputFormField("Message", message);

    await contactPage.submitContactForm();

    const successMessage = await contactPage.getSuccessfulSubmissionMessage();

    expect(successMessage?.trim()).toBe(
      `Thanks ${forename}, we appreciate your feedback.`
    );
  });
});
