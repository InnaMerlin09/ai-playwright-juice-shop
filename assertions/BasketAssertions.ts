import { expect, Page } from '@playwright/test';

import { selectors } from '../pages/BasketPage';

export async function expectBasketNotificationToConfirm(
    page: Page,
    productName: string
): Promise<void> {
    await expect(
        page.locator(selectors.snackbar).filter({ hasText: productName }).first()
    ).toBeVisible();
}

export async function expectBasketToContain(
    page: Page,
    productName: string
): Promise<void> {
    await expect(
        page.locator(selectors.basketRow).filter({ hasText: productName })
    ).toBeVisible();
}

export async function expectProductQuantityToBe(
    page: Page,
    productName: string,
    expectedQuantity: string
): Promise<void> {
    await expect(
        page
            .locator(selectors.basketRow)
            .filter({ hasText: productName })
            .locator(selectors.quantityDisplay)
    ).toHaveText(expectedQuantity);
}
