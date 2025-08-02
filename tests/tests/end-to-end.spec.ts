import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { TodoListPage } from '../pages/TodoListPage';
import { generateRandomUser } from '../data/users';
import { generateRandomTodo } from '../data/todos';

test('End-to-end user journey', async ({ page }) => {
  // 1. Register a new user
  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  const newUser = generateRandomUser();
  await registerPage.register(
    newUser.username,
    newUser.email,
    newUser.password,
    newUser.password
  );

  // 2. Login with the new user
  const loginPage = new LoginPage(page);
  await loginPage.login(newUser.username, newUser.password);

  // 3. Create multiple todo items
  const todoListPage = new TodoListPage(page);
  await todoListPage.waitForPageLoad();

  const todo1 = generateRandomTodo();
  const todo2 = generateRandomTodo();
  const todo3 = generateRandomTodo();

  await todoListPage.addTask(todo1);
  await todoListPage.addTask(todo2);
  await todoListPage.addTask(todo3);

  // 4. Verify all todos exist
  await todoListPage.expectTaskExists(todo1);
  await todoListPage.expectTaskExists(todo2);
  await todoListPage.expectTaskExists(todo3);

  // 5. Mark one as completed
  await todoListPage.toggleTaskCompletion(todo2);
  await todoListPage.expectTaskCompleted(todo2);

  // 6. Delete one todo
  await todoListPage.deleteTask(todo3);
  await todoListPage.expectTaskNotExists(todo3);

  // 7. Refresh page and verify persistence
  await page.reload();
  await todoListPage.waitForPageLoad();

  await todoListPage.expectTaskExists(todo1);
  await todoListPage.expectTaskExists(todo2);
  await todoListPage.expectTaskNotExists(todo3);
  await todoListPage.expectTaskCompleted(todo2);

  // 8. Logout
  await page.locator('text=Logout').click();
  await page.waitForURL('/');
});
