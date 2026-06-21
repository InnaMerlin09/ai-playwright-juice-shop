import { Page } from '@playwright/test';

import { click, clickIfVisible } from '../utils/playwrightActions';

export const selectors = {
    cookieConsentButton: '.cc-window .cc-btn',

    // Shared — mat-radio-button is used on address, delivery, and payment steps
    radioButton: 'mat-radio-button',

    // Address step — /#/address/select
    proceedToPaymentButton: 'button[aria-label="Proceed to payment selection"]',

    // Delivery step — /#/delivery-method
    proceedToDeliveryButton: 'button[aria-label="Proceed to delivery method selection"]',

    // Payment step — /#/payment/shop
    proceedToReviewButton: 'button[aria-label="Proceed to review"]',

    // Order summary — /#/order-summary
    placeOrderButton: 'button[aria-label="Complete your purchase"]',
};

export async function dismissCookieConsent(
    page: Page
): Promise<void> {
    await clickIfVisible(page.locator(selectors.cookieConsentButton));
}

export async function selectFirstAddress(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.radioButton).first());
}

export async function continueFromAddress(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.proceedToPaymentButton));
}

export async function selectFirstDeliveryOption(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.radioButton).first());
}

export async function continueFromDelivery(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.proceedToDeliveryButton));
}

export async function selectFirstPaymentCard(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.radioButton).first());
}

export async function continueFromPayment(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.proceedToReviewButton));
}

export async function placeOrder(
    page: Page
): Promise<void> {
    await click(page.locator(selectors.placeOrderButton));
}
