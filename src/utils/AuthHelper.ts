import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { YopmailHelper } from './YopmailHelper';
import { users } from '../constants/users';

export class AuthHelper {

  static async loginAs(page: Page, role: keyof typeof users) {

    const user = users[role];

    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(user.email, user.password);

    const otp = await YopmailHelper.fetchOtp(page, user.email);
    await loginPage.enterOtp(otp);
    return dashboard;
  }
}
