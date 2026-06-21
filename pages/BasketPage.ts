import { Page } from '@playwright/test';

import { click } from '../utils/playwrightActions';

export const selectors = {
    snackbar: 'mat-snack-bar-container',
    checkoutButton: 'button.checkout-button',
    basketRow: 'mat-row',
    increaseQuantityButton: 'button:has([data-icon="plus-square"])',
    decreaseQuantityButton: 'button:has([data-icon="minus-square"])',
    removeItemButton:       'button:has([data-icon="trash-alt"])',
    quantityDisplay: 'span.cell-initial-font',
};

export async function clearBasket(
    page: Page
): Promise<void> {
    await page.waitForFunction(() => !!localStorage.getItem('token'));
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const response = await page.request.get('/api/BasketItems', {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    for (const item of data.data ?? []) {
        await page.request.delete(`/api/BasketItems/${item.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export async function proceedToCheckout(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.checkoutButton));
}

export async function increaseProductQuantity(
    page: Page,
    productName: string
): Promise<void> {
    await click(
        page
            .locator(selectors.basketRow)
            .filter({ hasText: productName })
            .locator(selectors.increaseQuantityButton)
    );
}

export async function decreaseProductQuantity(
    page: Page,
    productName: string
): Promise<void> {
    await click(
        page
            .locator(selectors.basketRow)
            .filter({ hasText: productName })
            .locator(selectors.decreaseQuantityButton)
    );
}

export async function removeProduct(
    page: Page,
    productName: string
): Promise<void> {
    await click(
        page
            .locator(selectors.basketRow)
            .filter({ hasText: productName })
            .locator(selectors.removeItemButton)
    );
}

export async function getProductQuantity(
    page: Page,
    productName: string
): Promise<string> {
    const text = await page
        .locator(selectors.basketRow)
        .filter({ hasText: productName })
        .locator(selectors.quantityDisplay)
        .textContent();

    return text?.trim() ?? '';
}
