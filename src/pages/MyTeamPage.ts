import { Page, Locator } from '@playwright/test';
import { ElementActions } from '../utils/elementActions';

export class MyTeamPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get addButton(): Locator {
  return this.page.locator(
    'xpath=//div[@role="tabpanel" and not(@hidden)]//button[.//span[contains(@class,"pi-plus")]]'
  );
}

  private get firstNameInput(): Locator {
    return this.page.locator('input[formcontrolname="firstName"]');
  }

  private get lastNameInput(): Locator {
    return this.page.locator('input[formcontrolname="lastName"]');
  }

  private get emailInput(): Locator {
    return this.page.locator('input[formcontrolname="email"]');
  }

  private get phoneInput(): Locator {
    return this.page.locator('input[formcontrolname="phone"]');
  }

  private get createButton(): Locator {
    return this.page.locator('button:has-text("Create")');
  }
    private get confirmYesButton(): Locator {
    return this.page.locator('//p-confirmdialog//button[.//span[text()="Yes"]]');
  }



  // =================== Dynamic Locator ===================
  private deleteButton(email: string): Locator {
    // Locator directly uses normalize-space() for robust matching
    return this.page.locator(`//tr[td[normalize-space(text())="${email}"]]//button[contains(@class, 'p-button-icon-only') and contains(@class, 'p-button-rounded')]`);
  }

  private editButton(email: string): Locator {
  return this.page.locator(
    `//tr[td[normalize-space()="${email}"]]//i[contains(@class,"pi-pencil")]`
  );
}

  private get saveButton(): Locator {
    return this.page.locator('#saveUserEditBtn');
  }


  // ✅ Reusable method to select tab by visible name
  async selectTab(tabName: string) {
    // Locate <a> containing span with tabName and click
    const tab = this.page.locator('a.p-tabview-nav-link >> span', { hasText: tabName });
    await tab.click();
  }

// Method to click the "+" button
async clickAddButton() {
    await ElementActions.clickElement(this.addButton);
}

  /**
   * Fully reusable method to create any user (Supervisor or Agent)
   */
  async createNewSupervisor(details: { firstName: string; lastName: string; email: string; phone: string, }) {
   

    // Wait for the form to appear
    await ElementActions.waitForElementVisible(this.firstNameInput);

    // Fill the form fields
    await ElementActions.writeText(this.firstNameInput, details.firstName);
    await ElementActions.writeText(this.lastNameInput, details.lastName);
    await ElementActions.writeText(this.emailInput, details.email);
    await ElementActions.writeText(this.phoneInput, details.phone);
     

    // Click the Create button
    await ElementActions.clickElement(this.createButton);
  }

    async deleteUserByEmail(email: string) {
    const button = this.deleteButton(email);
    await ElementActions.waitForElementVisible(button);
    await ElementActions.clickElement(button);

    // Confirm deletion
    await ElementActions.waitForElementVisible(this.confirmYesButton);
    await ElementActions.clickElement(this.confirmYesButton);
  }

  async createNewAgent(details: { firstName: string; lastName: string; email: string; phone: string, supervisorName: string }) {
    // Wait for the form to appear
    await ElementActions.waitForElementVisible(this.firstNameInput); 
 // Fill the form fields
    await ElementActions.writeText(this.firstNameInput, details.firstName);
    await ElementActions.writeText(this.lastNameInput, details.lastName);
    await ElementActions.writeText(this.emailInput, details.email);
    await ElementActions.writeText(this.phoneInput, details.phone);
     

    // Select Supervisor
const supervisorDropdown = this.page.getByRole('combobox', { name: 'Select Supervisor' });
await supervisorDropdown.click();
await this.page .getByText(details.supervisorName, { exact: false }).click();

    // Click the Create button
    await ElementActions.clickElement(this.createButton);

}

 


/*
 * Edits user details based on email.
 * @param email User email to locate the row.
 * @param details Updated user details (firstName, lastName, phone).
 */
async editUserByEmail(
  email: string,
  details: { firstName?: string; lastName?: string; phone?: string }
): Promise<void> {

  console.log(`Starting edit for user with email: ${email}`);

  // Click edit icon
  const editBtn = this.editButton(email);
  await ElementActions.waitForElementVisible(editBtn);
  console.log(`Edit button found for ${email}, clicking edit`);
  await ElementActions.clickElement(editBtn);

  // Wait for edit dialog
  await ElementActions.waitForElementVisible(this.firstNameInput);
  console.log("Edit dialog opened");

  // First Name update
  if (details.firstName) {
    const currentFirstName = await this.firstNameInput.inputValue();
    console.log(`Current First Name: ${currentFirstName}`);
    console.log(`New First Name: ${details.firstName}`);

    if (currentFirstName !== details.firstName) {
      console.log("Updating First Name...");
      await ElementActions.writeText(this.firstNameInput, details.firstName);
    } else {
      console.log("First Name is same, skipping update");
    }
  }

  // Last Name update
  if (details.lastName) {
    const currentLastName = await this.lastNameInput.inputValue();
    console.log(`Current Last Name: ${currentLastName}`);
    console.log(`New Last Name: ${details.lastName}`);

    if (currentLastName !== details.lastName) {
      console.log("Updating Last Name...");
      await ElementActions.writeText(this.lastNameInput, details.lastName);
    } else {
      console.log("Last Name is same, skipping update");
    }
  }

  // Phone update
  if (details.phone) {
    const currentPhone = await this.phoneInput.inputValue();
    console.log(`Current Phone: ${currentPhone}`);
    console.log(`New Phone: ${details.phone}`);

    if (currentPhone !== details.phone) {
      console.log("Updating Phone...");
      await ElementActions.writeText(this.phoneInput, details.phone);
    } else {
      console.log("Phone number is same, skipping update");
    }
  }

  // Click Save
  console.log("Clicking Save button...");
  await ElementActions.clickElement(this.saveButton);

  console.log(`User details updated successfully for ${email}`);
}


/**
 * Checks whether a user with given email exists in the table
 */
async isUserPresent(email: string): Promise<boolean> {

  const userRow = this.page.locator(`//tr[td[normalize-space()="${email}"]]`);

  await userRow.first().waitFor({ state: 'attached', timeout: 1000 }).catch(() => {});

  const count = await userRow.count();

  return count > 0;
}
}