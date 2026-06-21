import { createBdd } from 'playwright-bdd';

import { expectProductsMatchingToBeDisplayed } from '../assertions/HomePageAssertions';
import { closeWelcomeBanner } from '../components/WelcomeBanner';
import { navigateToHomePage, searchProduct } from '../pages/HomePage';
import { test } from '../support/testFixtures';

const { Given, When, Then } = createBdd(test);

Given('the user is on the Juice Shop homepage', async ({ page }) => {
  await navigateToHomePage(page);
  await closeWelcomeBanner(page);
});

When('the user searches for {string}', async ({ page }, productName: string) => {
  await searchProduct(page, productName);
});

Then(
  'products matching {string} should be displayed',
  async ({ page }, productName: string) => {
    await expectProductsMatchingToBeDisplayed(page, productName);
  }
);
