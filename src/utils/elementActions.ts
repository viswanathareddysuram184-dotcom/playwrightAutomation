import { Locator, expect, Page } from '@playwright/test';

/**
 * ElementActions
 * --------------
 * Reusable UI action wrappers for Playwright.
 * All element interactions should go through this class.
 */
export class ElementActions {

  /**
   * Click on an element after verifying visibility and enabled state.
   */
  static async clickElement(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  /**
   * Enter text into an input field.
   */
  static async writeText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEditable();
    await locator.fill(text);
  }

  /**
   * Clear text from an input field.
   */
  static async clearText(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill('');
  }

  /**
   * Wait until element is visible.
   */
  static async waitForElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Wait until element is enabled.
   */
  static async waitForElementEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  /**
   * Select value from native dropdown using visible text.
   */
  static async selectDropdownByText(locator: Locator, visibleText: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.selectOption({ label: visibleText });
  }

  /**
   * Select value from native dropdown using value attribute.
   */
  static async selectDropdownByValue(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.selectOption({ value });
  }

  /**
   * Select option from custom dropdown (Angular / PrimeNG).
   */
  static async selectCustomDropdownOption(
    dropdownLocator: Locator,
    optionLocator: Locator
  ): Promise<void> {
    await this.clickElement(dropdownLocator);
    await expect(optionLocator).toBeVisible();
    await optionLocator.click();
  }

  /**
   * Select a tab element.
   */
  static async selectTab(locator: Locator): Promise<void> {
    await this.clickElement(locator);
  }

  /**
   * Check a checkbox.
   */
  static async checkCheckbox(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.check();
  }

  /**
   * Navigate to a specific URL.
   */
  static async navigateTo(page: Page, url: string): Promise<void> {
    await page.goto(url);
  }

  /**
   * Wait until URL contains expected text.
   */
  static async waitForUrlContains(page: Page, partialUrl: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(partialUrl));
  }
}
