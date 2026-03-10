import { Page, expect } from '@playwright/test';
import { ElementActions } from '../utils/elementActions';
import { testData } from '../constants/testData';

export class YopmailHelper {

  /**
   * Fetch OTP from Yopmail inbox.
   */
  static async fetchOtp(page: Page, email: string): Promise<string> {

  const yopmailPage = await page.context().newPage();
  await yopmailPage.setViewportSize({ width: 1550, height: 900 });
  await yopmailPage.goto(testData.yopmailUrl);

  const emailInput = yopmailPage.locator('input[name="login"]');
  const checkInboxBtn = yopmailPage.locator('#refreshbut button');
  const frameLocator = yopmailPage.frameLocator('iframe[name="ifmail"]');
  const bodyLocator = frameLocator.locator('body');

  let otp: string | null = null;

  for (let i = 0; i < 5; i++) {

    console.log(`Attempt ${i + 1}`);

    // Enter email
    await emailInput.waitFor({ state: 'visible' });
    await emailInput.fill('');
    await emailInput.fill(email);

    // Click Check Inbox
    await checkInboxBtn.waitFor({ state: 'visible' });
    await checkInboxBtn.click();

    try {

      // Wait 3 sec for OTP
      await expect(bodyLocator).toContainText(/\d{6}/, { timeout: 3000 });

      const text = await bodyLocator.innerText();
      const match = text.match(/\d{6}/);

      if (match) {
        otp = match[0];
        console.log(`OTP Found: ${otp}`);
        break;
      }

    } catch {

      console.log("OTP not found, reloading page...");
      await yopmailPage.reload(); // reload page

    }
  }

  expect(otp, 'OTP not found after retries').not.toBeNull();

  await yopmailPage.close();

  return otp!;
}}