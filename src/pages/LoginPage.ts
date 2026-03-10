import { Page, Locator } from '@playwright/test';
import { ElementActions } from '../utils/elementActions';
import { testData } from '../constants/testData';

export class LoginPage {

  constructor(private page: Page) {}

  private get emailTextbox(): Locator {
    return this.page.getByRole('textbox', { name: 'email@genixvista.com' });
  }

  private get passwordTextbox(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  private get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login', exact: true });
  }

  private get otpTextbox(): Locator {
    return this.page.getByRole('textbox', { name: 'Enter otp' });
  }
   private get otpField(): Locator {
    return this.page.getByRole('textbox', { name: 'Enter otp' });
  }

  private get submitBtn(): Locator {
    return this.page.getByRole('button', { name: 'Submit OTP' });
  }


  /**
   * Navigate to login page.
   */
  async navigateToLogin(): Promise<void> {
    
    await ElementActions.navigateTo(this.page, testData.baseUrl);
  }

  /**
   * Perform login using username and password.
   */
  async login(username: string, password: string): Promise<void> {
    await ElementActions.writeText(this.emailTextbox, username);
    await ElementActions.writeText(this.passwordTextbox, password);
    await ElementActions.clickElement(this.loginButton);
    await ElementActions.waitForLoaderToDisappear(this.page);
    await ElementActions.waitForElementVisible(this.otpTextbox);
  }

    async enterOtp(otp: string) {
    await this.otpField.fill(otp);
    await this.submitBtn.click();
  }
}
