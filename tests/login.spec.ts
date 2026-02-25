import { test } from '@playwright/test';
import { AuthHelper } from '../src/utils/AuthHelper';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';

 

test.only('Login as Super Admin', async ({ page }) => {
  await AuthHelper.loginAs(page, 'superAdmin');


  
});

test('Login as Tenant Admin', async ({ page }) => {
  await AuthHelper.loginAs(page, 'tenantAdmin');
});

test('Login as Supervisor', async ({ page }) => {
  await AuthHelper.loginAs(page, 'supervisor');
});

test('Login as Agent', async ({ page }) => {
  await AuthHelper.loginAs(page, 'agent');

});
