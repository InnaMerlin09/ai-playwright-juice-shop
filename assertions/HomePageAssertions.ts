import { expect, Page } from "@playwright/test";

export async function expectHomePageToBeDisplayed(page: Page): Promise<void> {
  await expect(page).toHaveURL(/search/);
}

export async function expectProductsMatchingToBeDisplayed(
  page: Page,
  productName: string,
): Promise<void> {
  await expect(
    page.getByText(productName, { exact: false }).first(),
  ).toBeVisible();
}
