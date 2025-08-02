import { test } from '../fixtures/fixtures';
import { validUser, invalidUser } from '../data/users';

test.describe('Login Functionality', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.visit();
  });

  test('should login with valid credentials', async ({ loginPage, todoListPage }) => {
    await loginPage.login(validUser.username, validUser.password);

    // Verify redirection to todolist page
    await todoListPage.validatePageNavigation();

  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);

    // Verify error message appears
    await loginPage.expectErrorMessage('Incorrect username');

  });

  test('should show error with valid username but invalid password', async ({ loginPage }) => {
    await loginPage.login(validUser.username, 'wrongpassword');

    // Verify error message appears
    await loginPage.expectErrorMessage('Incorrect password');

  });

  test('should navigate to register page', async ({ loginPage }) => {
    await loginPage.navigateToRegister();
  });
});
