import { Page, Locator, expect } from '@playwright/test';
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page,'/');
  }

  private readonly usernameInput: Locator = this.page.locator('input[name="username"]');
  private readonly passwordInput = this.page.locator('input[name="password"]');
  private readonly loginButton = this.page.locator('button:has-text("Login")');
  private readonly registerLink = this.page.locator('a:has-text("Register")');
  private readonly errorToast = this.page.locator('.Toastify__toast--error');

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/To-Do App/i);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorToast).toBeVisible();
    await expect(this.errorToast).toContainText(message);
  }

  async navigateToRegister() {
    await this.registerLink.click();
    await expect(this.page).toHaveURL(/\/register/);
  }
}
