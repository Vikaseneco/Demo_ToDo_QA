import { expect } from '../fixtures/fixtures';
import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";

export class TodoListPage extends BasePage{

  constructor(page: Page) {
    super(page,'/todolist');
  }

  private readonly taskInput = this.page.locator('input[placeholder*="add your tasks here"]');
  private readonly addButton = this.page.locator('button:has-text("Add")');
  private readonly todoItems = this.page.locator('.MDBListGroup');
  private readonly todoItemsText = this.page.locator('.lead.fw-normal');
  private readonly checkboxes = this.page.locator('input[type="checkbox"]');
  private readonly deleteButtons = this.page.locator('svg[icon="trash-alt"]');
  private readonly successToast = this.page.locator('.Toastify__toast--success');
  private readonly errorToast = this.page.locator('.Toastify__toast--error');
  private readonly welcomeMessage = this.page.locator('text=My Todo-s');

  async waitForPageLoad() {
    await expect(this.welcomeMessage).toBeVisible();
    await this.page.waitForLoadState('networkidle');
  }

  async validatePageNavigation() {
    await expect(this.page, 'Page URL to contain /settings/alarms').toHaveURL(/todolist/);
  }
  
  async addTask(text: string) {
    await this.taskInput.fill(text);
    await this.addButton.click();
    // Wait for network request to complete
    await this.page.waitForResponse(response => 
      response.url().includes('/api/route/tasks') && response.status() === 201
    );
  }

  async addEmptyTask() {
    await this.taskInput.fill('');
    await this.addButton.click();
  }

  async getTaskByText(text: string) {
    return this.todoItemsText.filter({ hasText: text });
  }

  async toggleTaskCompletion(taskText: string) {
    const taskIndex = await this.getTaskIndex(taskText);
    if (taskIndex !== -1) {
      await this.checkboxes.nth(taskIndex).click();
      // Wait for network request to complete
      await this.page.waitForResponse(response => 
        response.url().includes('/api/route/tasks') && response.status() === 200
      );
    }
  }

  async deleteTask(taskText: string) {
    const taskIndex = await this.getTaskIndex(taskText);
    if (taskIndex !== -1) {
      await this.deleteButtons.nth(taskIndex).click();
      // Wait for network request to complete
      await this.page.waitForResponse(response => 
        response.url().includes('/api/route/tasks') && response.status() === 204
      );
    }
  }

  async getTaskIndex(taskText: string): Promise<number> {
    const count = await this.todoItemsText.count();
    for (let i = 0; i < count; i++) {
      const text = await this.todoItemsText.nth(i).textContent();
      if (text === taskText) {
        return i;
      }
    }
    return -1;
  }

  // async expectTaskExists(taskText: string) {
  //   const taskLocator = this.getTaskByText(taskText);
  //   await expect(taskLocator).toBeVisible();
  // }
  //
  // async expectTaskNotExists(taskText: string) {
  //   const taskLocator = this.getTaskByText(taskText);
  //   await expect(taskLocator).toHaveCount(0);
  // }

  async expectTaskCompleted(taskText: string) {
    const taskIndex = await this.getTaskIndex(taskText);
    if (taskIndex !== -1) {
      const task = this.todoItemsText.nth(taskIndex);
      await expect(task).toHaveClass(/text-decoration-line-through/);
    } else {
      throw new Error(`Task '${taskText}' not found`);
    }
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorToast).toBeVisible();
    await expect(this.errorToast).toContainText(message);
  }
}
