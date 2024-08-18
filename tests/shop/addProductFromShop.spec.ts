import { test, expect } from "@playwright/test";
import HomePage from "../../pages/home/homePage";
import ShopPage from "../../pages/shop/shopPage";
import CartPage from "../../pages/cart/cartPage";

test.describe("Add Product from Shop", () => {
  const product1 = "Stuffed Frog";
  const product2 = "Fluffy Bunny";
  const product3 = "Valentine Bear";

  test("should be able to add products from shop", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();

    const shopPage = new ShopPage(page);
    await shopPage.navigateToShopPage();

    await shopPage.addToCart(product1, 2);
    await shopPage.addToCart(product2, 5);
    await shopPage.addToCart(product3, 3);

    const productList = await shopPage.getProductList();

    const cartPage = new CartPage(page);
    await cartPage.navigateToCartPage();
    const areSubTotalsCorrect = await cartPage.verifySubtotals();

    expect(areSubTotalsCorrect).toBeTruthy();
    const cartItems = await cartPage.getCartDetails();

    const areProductPricesCorrect = await cartPage.verifyProductPrices(
      productList,
      cartItems
    );

    expect(areProductPricesCorrect).toBeTruthy();

    const isCartTotalCorrect = await cartPage.verifyTotal();
    expect(isCartTotalCorrect).toBeTruthy();
  });
});
