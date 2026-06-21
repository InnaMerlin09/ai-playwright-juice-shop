import { Page } from '@playwright/test';
import { click, fill } from '../utils/playwrightActions';

export const selectors = {
    emailInput: '#email',
    passwordInput: '#password',
    loginButton: '#loginButton',
};

export async function navigateToLoginPage(page: Page): Promise<void> {
    await page.goto('/#/login');
}

export async function loginWithCredentials(page: Page, email: string, password: string): Promise<void> {
    await fill(page.locator(selectors.emailInput), email);
    await fill(page.locator(selectors.passwordInput), password);
    await click(page.locator(selectors.loginButton));
}
