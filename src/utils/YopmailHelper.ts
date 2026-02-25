import { Page, expect } from '@playwright/test';
import { ElementActions } from '../utils/elementActions';
import { testData } from '../constants/testData';

export class YopmailHelper {

  /**
   * Fetch OTP from Yopmail inbox.
   */
  static async fetchOtp(page: Page, email: string): Promise<string> {

    const yopmailPage = await page.context().newPage();

    await ElementActions.navigateTo(yopmailPage, testData.yopmailUrl);

    await ElementActions.writeText(
      yopmailPage.getByRole('textbox', { name: 'Login' }),
      email
    );

    await ElementActions.clickElement(
      yopmailPage.getByTitle('Check Inbox @yopmail.com')
    );

    const frameElement = await yopmailPage.waitForSelector('iframe[name="ifmail"]');
    const frame = await frameElement.contentFrame();

    const bodyLocator = frame!.locator('body');

    // Wait until OTP appears
    await expect(bodyLocator).toContainText(/\d{6}/, { timeout: 15000 });

    const text = await bodyLocator.innerText();
    const otpMatch = text.match(/\d{6}/);

    expect(otpMatch, 'OTP not found in Yopmail inbox').not.toBeNull();

    await yopmailPage.close();

    return otpMatch![0];
  }
}
