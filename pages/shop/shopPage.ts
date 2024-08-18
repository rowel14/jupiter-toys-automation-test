import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage";

export interface Product {
  productName: string;
  productPrice: string;
}

export default class ShopPage extends BasePage {
  readonly subUrl = "/#/shop";

  constructor(page: Page) {
    super(page);
    this.baseSelector = page.locator(".products");
  }

  async addToCart(productName: string, quantity: number): Promise<void> {
    const product = this.page.locator(
      `//*[@class='product-title ng-binding' and contains(text(), '${productName}')]/parent::div/p/a`
    );

    for (let i = 0; i < quantity; i++) {
      await product.click();
    }
  }

  async getProductList(): Promise<any> {
    const productList: Product[] = [];

    const productNames = await this.page
      .locator(".product-title")
      .allInnerTexts();

    const productPrices = await this.page
      .locator(".product-price")
      .allInnerTexts();

    for (let i = 0; i < productNames.length; i++) {
      productList.push({
        productName: productNames[i],
        productPrice: productPrices[i],
      } as Product);
    }

    return productList;
  }

  async navigateToShopPage(): Promise<void> {
    await this.navigateTo(this.subUrl);
  }
}
