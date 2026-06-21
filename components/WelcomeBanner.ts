import { Page } from '@playwright/test';

import { click } from '../utils/playwrightActions';

const CLOSE_BUTTON = 'button[aria-label="Close Welcome Banner"]';

export async function closeWelcomeBanner(page: Page): Promise<void> {
  await click(page.locator(CLOSE_BUTTON));
}
