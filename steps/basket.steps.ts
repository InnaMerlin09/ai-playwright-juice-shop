import { createBdd } from 'playwright-bdd';
import { test } from '../support/testFixtures';
import { searchProduct, openBasket, addProductToBasket } from '../pages/HomePage';
import { clearBasket, increaseProductQuantity } from '../pages/BasketPage';
import {
    expectBasketNotificationToConfirm,
    expectBasketToContain,
    expectProductQuantityToBe,
} from '../assertions/BasketAssertions';

const { Given, When, Then } = createBdd(test);

Given('the basket is empty', async ({ page }) => {
    await clearBasket(page);
});

Given('the user has {string} in the basket', async ({ page }, product: string) => {
    await searchProduct(page, product);
    await addProductToBasket(page, product);
    await expectBasketNotificationToConfirm(page, product);
});

When('the user adds {string} to the basket', async ({ page }, product: string) => {
    await addProductToBasket(page, product);
});

When('the user opens the basket', async ({ page }) => {
    await openBasket(page);
});

When('the user increases the quantity of {string}', async ({ page }, product: string) => {
    await increaseProductQuantity(page, product);
});

Then('the basket notification confirms {string} was added', async ({ page }, product: string) => {
    await expectBasketNotificationToConfirm(page, product);
});

Then('the basket contains {string}', async ({ page }, product: string) => {
    await expectBasketToContain(page, product);
});

Then('the quantity of {string} in the basket is {string}', async ({ page }, product: string, expectedQuantity: string) => {
    await expectProductQuantityToBe(page, product, expectedQuantity);
});
