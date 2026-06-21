import { Page } from '@playwright/test';
import { click, fill, pressKey } from '../utils/playwrightActions';

export const selectors = {
    searchButton: 'button[aria-label="Open search"]',
    searchInput: '#searchQuery input',
    basketButton: '[aria-label="Show the shopping cart"]',
    productCard: 'mat-card',
    addToBasketButton: 'button[aria-label="Add to Basket"]',
};

export async function navigateToHomePage(page: Page): Promise<void> {
    await page.goto('/#/');
}

export async function searchProduct(page: Page, productName: string): Promise<void> {
    await click(page.locator(selectors.searchButton));
    await fill(page.locator(selectors.searchInput), productName);
    await pressKey(page.locator(selectors.searchInput), 'Enter');
}

export async function openBasket(page: Page): Promise<void> {
    await click(page.locator(selectors.basketButton));
}

export async function addProductToBasket(page: Page, productName: string): Promise<void> {
    await click(
        page.locator(selectors.productCard)
            .filter({ has: page.getByText(productName, { exact: true }) })
            .locator(selectors.addToBasketButton)
    );
}
