import { test } from '@playwright/test';
import { AuthHelper } from '../src/utils/AuthHelper';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { USER_ROLES } from '../src/constants/testData';
import { MyTeamPage } from '../src/pages/MyTeamPage';
import { generateUniqueEmail, generateUniquePassword, generateUniquePhone } from '../src/utils/UniqueData';
import { ElementActions } from '../src/utils/elementActions';

 

test('Verify user able to Login as Super Admin', async ({ page }) => {
  await AuthHelper.loginAs(page, USER_ROLES.SUPER_ADMIN);
 
});

test('Verify user able to Login as Tenant Admin', async ({ page }) => {
  await AuthHelper.loginAs(page, USER_ROLES.TENANT_ADMIN);
});

test('Verify user able to Login as Manager', async ({ page }) => {
  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
});

test('Verify user able to Login as Supervisor', async ({ page }) => {
  await AuthHelper.loginAs(page, USER_ROLES.SUPERVISOR);
});

test('Verify user able to Login as Agent', async ({ page }) => {
  await AuthHelper.loginAs(page, USER_ROLES.AGENT);
});

//added data


 