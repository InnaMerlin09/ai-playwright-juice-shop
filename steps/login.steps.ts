import { createBdd } from 'playwright-bdd';

import { env } from '../support/env';
import { test } from '../support/testFixtures';

import { closeWelcomeBanner } from '../components/WelcomeBanner';
import {
    navigateToLoginPage,
    loginWithCredentials
} from '../pages/LoginPage';

import {
    expectHomePageToBeDisplayed
} from '../assertions/HomePageAssertions';

const { Given, When, Then } = createBdd(test);

Given(
    'the user is on the login page',
    async ({ page }) => {

        await navigateToLoginPage(page);

        await closeWelcomeBanner(page);

    }
);

When(
    'the user logs in with valid credentials',
    async ({ page }) => {

        await loginWithCredentials(
            page,
            env.testUserEmail,
            env.testUserPassword
        );

    }
);

Then(
    'the homepage should be displayed',
    async ({ page }) => {

        await expectHomePageToBeDisplayed(page);

    }
);