import { Page, Locator, expect } from '@playwright/test';
import { ElementActions } from '../utils/elementActions';

export class DashboardPage {

  private page: Page;
  private fullLogo: Locator;
  private userInfo: Locator;
  private dateInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullLogo = page.getByRole('img', { name: 'Full Logo' });
    this.userInfo = page.locator('p.font-semibold.pl-2.cursor-pointer.select-none.m-0');
    this.dateInput = page.getByPlaceholder('YYYY-MM-DD');
  }

 

  async verifyUser(expectedName: string, expectedRole: string) {
    // Get the full text from userInfo, e.g. "Alex Hunter [Manager]"
    const fullText = await this.userInfo.textContent();

    // Check if fullText contains expectedName and expectedRole
    expect(fullText).toContain(expectedName);
    expect(fullText).toContain(`[${expectedRole}]`);
  }
  
  async navigateTO(menuName: string){
    await this.page.locator('a').filter({ hasText: menuName }).click();
  }

 /*
 * Selects a date in the Date field
 * @param date - Date string in 'yyyy-mm-dd' format (Example: '2026-03-02')
 */



}