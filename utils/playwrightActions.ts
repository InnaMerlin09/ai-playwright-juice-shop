
import { expect, Locator } from '@playwright/test';

export async function click(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEnabled();

  await locator.click();
}

export async function fill(locator: Locator, value: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEditable();

  await locator.fill(value);
}

export async function type(locator: Locator, value: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEditable();

  await locator.pressSequentially(value);
}

export async function clear(locator: Locator): Promise<void> {
  await expect(locator).toBeEditable();

  await locator.clear();
}

export async function check(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();

  await locator.check();
}

export async function uncheck(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();

  await locator.uncheck();
}

export async function select(locator: Locator, value: string): Promise<void> {
  await expect(locator).toBeVisible();

  await locator.selectOption(value);
}

export async function pressKey(locator: Locator, key: string): Promise<void> {
  await expect(locator).toBeVisible();

  await locator.press(key);
}

export async function clickIfVisible(locator: Locator): Promise<void> {
  if (await locator.isVisible()) {
    await locator.click();
  }
}