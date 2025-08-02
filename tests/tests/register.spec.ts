import { test } from '../fixtures/fixtures';
import { generateRandomUser } from '../data/users';

test.describe('User Registration', () => {

  test('should register a new user successfully', async ({ registerPage }) => {
    await registerPage.visit();
    await registerPage.validatePageNavigation();
    const newUser = generateRandomUser();

    await registerPage.register(
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.password
    );
  });

  test('should show error when passwords do not match', async ({ registerPage }) => {
    await registerPage.visit();
    await registerPage.validatePageNavigation();
    const newUser = generateRandomUser();

    await registerPage.register(
      newUser.username,
      newUser.email,
      newUser.password,
      'DifferentPassword123!'
    );
    // Verify error message appears
    await registerPage.expectErrorMessage('Password and Confirm Password should be the same');

  });

  test('should show error for weak password', async ({ registerPage }) => {
    await registerPage.visit();
    await registerPage.validatePageNavigation();
    const newUser = generateRandomUser();

    await registerPage.register(
      newUser.username,
      newUser.email,
      '123', // Too short password
      '123'
    );

    // Verify error message appears
    await registerPage.expectErrorMessage('Password length must be at least 8 characters');
  });

  test('should show error for invalid email format', async ({ registerPage }) => {
    await registerPage.visit();
    await registerPage.validatePageNavigation();
    const newUser = generateRandomUser();

    await registerPage.register(
      newUser.username,
      'invalid-email', // Invalid email format
      newUser.password,
      newUser.password
    );

    // Verify error message appears
    await registerPage.expectErrorMessage('Please enter a valid email address');
  });

  test('should navigate back to login page', async ({ registerPage }) => {
    await registerPage.visit();
    await registerPage.validatePageNavigation();
    await registerPage.navigateToLogin();
  });
});
