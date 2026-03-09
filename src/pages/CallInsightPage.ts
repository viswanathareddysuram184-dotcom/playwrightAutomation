import { Page, Locator, expect } from '@playwright/test';
import { ElementActions } from '../utils/elementActions';

export class CallInsightsPage {

  private page: Page;
  private pageTitle: Locator;
  private pageSubTitle: Locator;
    private dateInput: Locator;
  private agentDropdown: Locator;
  private callIdDropdown: Locator;


  constructor(page: Page) {
    this.page = page;

    // Better to use text-based locators instead of class
    this.pageTitle = page.getByRole('heading', { name: 'Call Insights' });
    this.pageSubTitle = page.getByText('Metrics and Assessment');
    this.dateInput = page.locator('p-calendar input');
    this.agentDropdown = page.getByRole('combobox', { name: 'Select Agent' });
    this.callIdDropdown = page.getByRole('combobox', { name: 'Select Call' });
  }

  async verifyCallInsightsPage(): Promise<void> {

    // Wait for page title
    await ElementActions.waitForElementVisible(this.pageTitle);
    await expect(this.pageTitle).toHaveText('Call Insights');

    // Verify subtitle
    await ElementActions.waitForElementVisible(this.pageSubTitle);
    await expect(this.pageSubTitle).toHaveText('Metrics and Assessment');
  }

  async verifyAgentAndCallIdState(isEnabled: boolean): Promise<void> {

  if (isEnabled) {
    await ElementActions.verifyEnabled(this.agentDropdown);
    await ElementActions.verifyEnabled(this.callIdDropdown);
  } else {
    await ElementActions.verifyDisabled(this.agentDropdown);
    await ElementActions.verifyDisabled(this.callIdDropdown);
  }
}

async selectDate(targetDate: string): Promise<void> {

  const date = new Date(targetDate);
  const targetMonth = date.toLocaleString('default', { month: 'long' });
  const targetYear = date.getFullYear().toString();
  const targetDay = date.getDate().toString();

  await this.dateInput.click();

  const calendar = this.page.locator('.p-datepicker');
  await expect(calendar).toBeVisible();

  while (true) {
    const currentMonth = (await calendar.locator('.p-datepicker-month').innerText()).trim();
    const currentYear = (await calendar.locator('.p-datepicker-year').innerText()).trim();

    if (currentMonth === targetMonth && currentYear === targetYear) {
      break;
    }

    const currentDate = new Date(`${currentMonth} 1, ${currentYear}`);
    const targetDateObj = new Date(`${targetMonth} 1, ${targetYear}`);

    if (currentDate < targetDateObj) {
      await calendar.locator('[aria-label="Next Month"]').click();
    } else {
      await calendar.locator('[aria-label="Previous Month"]').click();
    }

    await expect(calendar.locator('.p-datepicker-month')).toHaveText(/.+/);
  }

  const dayLocator = calendar.locator(
    `td[aria-label="${targetDay}"]:not(.p-datepicker-other-month) span:not(.p-disabled)`
  );

  await expect(dayLocator.first()).toBeVisible();
  await dayLocator.first().click();
}
 
}
