
import { test } from '@playwright/test';
import { AuthHelper } from '../src/utils/AuthHelper';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { USER_ROLES } from '../src/constants/testData';
import { MyTeamPage } from '../src/pages/MyTeamPage';
import { CallInsightsPage } from '../src/pages/CallInsightPage';
 
test('Verify Manager able to view  call insights page elements', async ({ page }) => {
  //Page Objects................
  const dashboard = new DashboardPage(page);
  const callInsightsPage = new CallInsightsPage(page);

  //Test Steps......................

  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
  await dashboard.navigateTO('Call Insights');
  await callInsightsPage.verifyCallInsightsPage(); 
  
});

test('Verify Agent and Call ID fields are disabled when Date is not selected across all user roles (Manager, Supervisor, etc.)', async ({ page }) => {
//Page Objects................
  const dashboard = new DashboardPage(page);
  const callInsightsPage = new CallInsightsPage(page);
//Test Steps......................
  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
  await dashboard.navigateTO('Call Insights');
  await callInsightsPage.verifyCallInsightsPage();
  await callInsightsPage.verifyAgentAndCallIdState(false);

  //login with supervisor and verify
    await AuthHelper.loginAs(page, USER_ROLES.SUPERVISOR);
    await dashboard.navigateTO('Call Insights');
    await callInsightsPage.verifyCallInsightsPage();
    await callInsightsPage.verifyAgentAndCallIdState(false);

});

test('Verify Agent and Call ID fields are enabled when Date is selected across all user roles (Manager, Supervisor, etc.)', async ({ page }) => {
//Page Objects................
  const dashboard = new DashboardPage(page);
  const callInsightsPage = new CallInsightsPage(page);
//Test Steps......................
//login with manager and verify
  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
  await dashboard.navigateTO('Call Insights');

  await callInsightsPage.verifyCallInsightsPage();
  await callInsightsPage.selectDate('2025-03-01');; 
  await callInsightsPage.verifyAgentAndCallIdState(true);

  //login with supervisor and verify
    await AuthHelper.loginAs(page, USER_ROLES.SUPERVISOR);
    await dashboard.navigateTO('Call Insights');
    await callInsightsPage.verifyCallInsightsPage();
    await callInsightsPage.selectDate('2025-03-01');
    await callInsightsPage.verifyAgentAndCallIdState(true);
});




