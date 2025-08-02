import { expect } from '../fixtures/fixtures';
import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";

export class RegisterPage extends BasePage{
  constructor(page: Page) {
    super(page,'/register');
  }

  private readonly usernameInput = this.page.locator('input[name="username"]');
  private readonly emailInput = this.page.locator('input[name="email"]');
  private readonly passwordInput = this.page.locator('input[name="password"]');
  private readonly confirmPasswordInput = this.page.locator('input[name="confirmPassword"]');
  private readonly registerButton = this.page.locator('button:has-text("Register")');
  private readonly loginLink = this.page.locator('a:has-text("Login")');
  private readonly errorToast = this.page.locator('.Toastify__toast--error');

  async validatePageNavigation() {
    await expect(this.page, 'Page URL to contain Register').toHaveURL(/register/);
  }

  async register(username: string, email: string, password: string, confirmPassword: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword || password);
    await this.registerButton.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorToast).toBeVisible();
    await expect(this.errorToast).toContainText(message);
  }

  async navigateToLogin() {
    await this.loginLink.click();
    await expect(this.page).toHaveURL('/');
  }
}
