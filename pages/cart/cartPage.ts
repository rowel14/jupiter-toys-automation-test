import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage";

export interface CartItem {
  productName: string;
  productPrice: string;
  productQuantity: string;
  productSubtotal: string;
}

export default class CartPage extends BasePage {
  readonly subUrl = "/#/cart";
  readonly cartTotal: Locator;

  constructor(page: Page) {
    super(page);
    this.baseSelector = page.locator(".cart-msg");
    this.cartTotal = page.locator(".total");
  }

  async navigateToCartPage(): Promise<void> {
    await this.navigateTo(this.subUrl);
  }

  async getCartDetails(): Promise<CartItem[]> {
    const inputValues: string[] = [];
    const cartItemArray: CartItem[] = [];

    const cartItems = await this.page.locator(".cart-item").allInnerTexts();
    const cartInputFields = this.page.locator(".input-mini");
    const inputCount = await cartInputFields.count();

    for (let i = 0; i < inputCount; i++) {
      const inputValue = await cartInputFields.nth(i).inputValue();
      inputValues.push(inputValue);
    }

    const cartItemDetails = cartItems.map((item) => item.split("\t"));

    cartItemDetails.forEach((item, index) => {
      const productName = item[0].trim() ?? "";
      const productPrice = item[1] ?? "";
      const productQuantity = inputValues[index] ?? "";
      const productSubtotal = item[3] ?? "";

      cartItemArray.push({
        productName,
        productPrice,
        productQuantity,
        productSubtotal,
      } as CartItem);
    });

    return cartItemArray;
  }

  async getCartTotal(): Promise<number> {
    const cartTotalText = await this.cartTotal.innerText();
    return Number(cartTotalText.split(" ")[1]);
  }

  async verifyTotal(): Promise<boolean> {
    const cartItems = await this.getCartDetails();
    const cartTotal = await this.getCartTotal();

    const subTotals = cartItems.reduce((acc, item) => {
      return acc + Number(item.productSubtotal.replace("$", ""));
    }, 0);

    return subTotals === cartTotal;
  }

  async verifySubtotals(): Promise<boolean> {
    let isAllSubTotalCorrect = true;

    const cartItemDetails = await this.getCartDetails();

    cartItemDetails.forEach((item) => {
      const price = Number(item.productPrice.replace("$", ""));
      const quantity = Number(item.productQuantity);
      const subTotal = Number(item.productSubtotal.replace("$", ""));

      if (price * quantity !== subTotal) {
        isAllSubTotalCorrect = false;
      }
    });
    return isAllSubTotalCorrect;
  }

  async verifyProductPrices(productList, cartItems): Promise<boolean> {
    let areProductPricesCorrect = true;

    cartItems.forEach((item) => {
      const product = productList.find(
        (p) => p.productName === item.productName
      );
      if (item.productPrice !== product.productPrice) {
        areProductPricesCorrect = false;
      }
    });

    return areProductPricesCorrect;
  }
}
