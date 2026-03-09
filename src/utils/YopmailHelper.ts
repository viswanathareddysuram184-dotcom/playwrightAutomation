import { Page, expect } from '@playwright/test';
import { ElementActions } from '../utils/elementActions';
import { testData } from '../constants/testData';

export class YopmailHelper {

  /**
   * Fetch OTP from Yopmail inbox.
   */
  static async fetchOtp(page: Page, email: string): Promise<string> {

  const yopmailPage = await page.context().newPage();

  await yopmailPage.goto(testData.yopmailUrl);

  // Enter email
  const emailInput = yopmailPage.locator('input[name="login"]');
  await emailInput.waitFor({ state: 'visible' });
  await emailInput.fill(email);

  // Stable click for Check Inbox
  await page.waitForTimeout(1000); 
  const checkInboxBtn = yopmailPage.locator('#refreshbut button');

  await checkInboxBtn.waitFor({ state: 'visible' });
  await checkInboxBtn.click({ force: true });

  // Wait for iframe
  const frameLocator = yopmailPage.frameLocator('iframe[name="ifmail"]');

  const bodyLocator = frameLocator.locator('body');

  // Wait until OTP appears
  await expect(bodyLocator).toContainText(/\d{6}/, { timeout: 20000 });

  const text = await bodyLocator.innerText();
  const otpMatch = text.match(/\d{6}/);

  expect(otpMatch, 'OTP not found in Yopmail inbox').not.toBeNull();

  await yopmailPage.close();

  return otpMatch![0];
}
}