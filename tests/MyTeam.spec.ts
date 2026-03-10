import { test } from '@playwright/test';
import { AuthHelper } from '../src/utils/AuthHelper';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { USER_ROLES } from '../src/constants/testData';
import { MyTeamPage } from '../src/pages/MyTeamPage';
import { generateUniqueEmail, generateUniquePassword, generateUniquePhone } from '../src/utils/UniqueData';
import { ElementActions } from '../src/utils/elementActions';

test('Verify Manager able to create new Supervisor and delete @smoke', async ({ page }) => {
  //Page Objects................
  const dashboard = new DashboardPage(page);
  const myTeamPage = new MyTeamPage(page);

  //TestData.......................

  const email = 'supervisor' + generateUniqueEmail();
  const phone = generateUniquePhone();
  const FirstName = 'Test';
  const LastName = 'Supervisor';

  //Test Steps......................

  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
  await dashboard.navigateTO('My Team');
  await myTeamPage.selectTab('Supervisors');
  await myTeamPage.clickAddButton();
  await myTeamPage.createNewSupervisor({
    firstName: FirstName,
    lastName: LastName,
    email,
    phone,
    
  });
  await  ElementActions.verifyToastAppeared(page);
  await myTeamPage.isUserPresent(email);
  await myTeamPage.deleteUserByEmail(email);
  await  ElementActions.verifyToastAppeared(page);
  
});

test('Verify Manager able to create new Agent and delete @smoke', async ({ page }) => {
  //Page Objects................
  const dashboard = new DashboardPage(page);
  const myTeamPage = new MyTeamPage(page);

  //TestData.......................

  const email = 'agent' + generateUniqueEmail();
  const phone = generateUniquePhone();
  const FirstName = 'Test';
  const LastName = 'Agent';
  const supervisorName = 'Casey Parker - casey-parker@yopmail.com';

  //Test Steps......................

  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
 
  await dashboard.navigateTO('My Team');
  await myTeamPage.selectTab('Agents');
  await myTeamPage.clickAddButton();
  await myTeamPage.createNewAgent({
    firstName: FirstName,
    lastName: LastName,
    email,
    phone,
    supervisorName: supervisorName 
  });
  await  ElementActions.verifyToastAppeared(page);
  await myTeamPage.isUserPresent(email);
  await myTeamPage.deleteUserByEmail(email);
  await  ElementActions.verifyToastAppeared(page);
 
});

test('Verify Manager Can Edit Supervisors', async ({ page }) => {
  //Page Objects................
  const dashboard = new DashboardPage(page);
  const myTeamPage = new MyTeamPage(page);

  //TestData.......................
  const firstName = 'NewTest';
  const lastName = 'NewSupervisor';
  const email = 'manager@gmail.com';
  const phoneNumber = '9999999999';

  const updatedName = 'UpdatedTest';
  const lastNameUpdated = 'UpdatedLastName';
  const phoneUpdated = '8888888888';

  //Test Steps......................
  
  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
  await dashboard.navigateTO('My Team');
  await myTeamPage.selectTab('Supervisors');

  // Check if user already exists
  const userExists = await myTeamPage.isUserPresent(email);

  if (!userExists) {
    console.log('User not found, creating new user');

    await myTeamPage.clickAddButton();

    await myTeamPage.createNewSupervisor({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phoneNumber
    });

    await ElementActions.verifyToastAppeared(page);

  } else {
    console.log('User already exists, skipping create flow');
  }

  // Edit flow
  await myTeamPage.editUserByEmail(email, {
    firstName: updatedName,
    lastName: lastNameUpdated,
    phone: phoneUpdated
  });

  await ElementActions.verifyToastAppeared(page);

  // Delete flow
  await myTeamPage.deleteUserByEmail(email);
  await ElementActions.verifyToastAppeared(page);

});

test('Verify Manager Can Edit Agent', async ({ page }) => {
  //Page Objects................
  const dashboard = new DashboardPage(page);
  const myTeamPage = new MyTeamPage(page);

  //TestData.......................
  const firstName = 'NewTest';
  const lastName = 'NewAgent';
  const email = 'agent@gmail.com';
  const phoneNumber = '9999999999';

  const updatedName = 'UpdatedTest';
  const lastNameUpdated = 'UpdatedLastName';
  const phoneUpdated = '8888888888';
  const supervisorName = 'Christopher Adam - christopher-adams@yopmail.com';

  //Test Steps......................
  
  await AuthHelper.loginAs(page, USER_ROLES.MANAGER);
  await dashboard.navigateTO('My Team');
  await myTeamPage.selectTab('Agents');

  // Check if user already exists
  const userExists = await myTeamPage.isUserPresent(email);

  if (!userExists) {
    console.log('User not found, creating new user');

    await myTeamPage.clickAddButton();

    await myTeamPage.createNewAgent({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        supervisorName: 'Casey Parker - casey-parker@yopmail.com'

    });

    await ElementActions.verifyToastAppeared(page);

  } else {
    console.log('User already exists, skipping create flow');
  }

  // Edit flow
  await myTeamPage.editUserByEmail(email, {
    firstName: updatedName,
    lastName: lastNameUpdated,
    phone: phoneUpdated,
    supervisorName: supervisorName 
  });

  await ElementActions.verifyToastAppeared(page);

  // Delete flow
  await myTeamPage.deleteUserByEmail(email);
  await ElementActions.verifyToastAppeared(page);

});







