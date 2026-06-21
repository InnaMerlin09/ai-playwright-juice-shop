import { createBdd } from 'playwright-bdd';

import { test } from '../support/testFixtures';

import {
    proceedToCheckout,
} from '../pages/BasketPage';

import {
    dismissCookieConsent,
    selectFirstAddress,
    continueFromAddress,
    selectFirstDeliveryOption,
    continueFromDelivery,
    selectFirstPaymentCard,
    continueFromPayment,
    placeOrder,
} from '../pages/CheckoutPage';

import {
    expectOrderConfirmationToBeDisplayed,
} from '../assertions/CheckoutAssertions';

const { When, Then } = createBdd(test);

When(
    'the user proceeds to checkout',
    async ({ page }) => {

        await proceedToCheckout(page);

    }
);

When(
    'the user dismisses the cookie banner',
    async ({ page }) => {

        await dismissCookieConsent(page);

    }
);

When(
    'the user selects a delivery address',
    async ({ page }) => {

        await selectFirstAddress(page);

    }
);

When(
    'the user continues to delivery options',
    async ({ page }) => {

        await continueFromAddress(page);

    }
);

When(
    'the user selects a delivery option',
    async ({ page }) => {

        await selectFirstDeliveryOption(page);

    }
);

When(
    'the user continues to payment',
    async ({ page }) => {

        await continueFromDelivery(page);

    }
);

When(
    'the user selects a payment card',
    async ({ page }) => {

        await selectFirstPaymentCard(page);

    }
);

When(
    'the user continues to order summary',
    async ({ page }) => {

        await continueFromPayment(page);

    }
);

When(
    'the user places the order',
    async ({ page }) => {

        await placeOrder(page);

    }
);

Then(
    'the order confirmation is displayed',
    async ({ page }) => {

        await expectOrderConfirmationToBeDisplayed(page);

    }
);
