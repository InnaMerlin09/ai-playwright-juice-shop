import { expect, Page } from '@playwright/test';

export async function expectOrderConfirmationToBeDisplayed(
    page: Page
): Promise<void> {
    await expect(
        page.getByText('Thank you for your purchase!')
    ).toBeVisible();
}
