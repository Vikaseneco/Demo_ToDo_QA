# ToDo App - Automated Tests

This folder contains automated tests for the ToDo application using Playwright with TypeScript and the Page Object Model (POM) design pattern.

## Test Structure

- `pages/`: Contains page object classes that encapsulate page interactions
- `fixtures/`: Contains fixtures
- `data/`: Contains test data files
- `tests/`: Contains the actual test files organized by feature

## Running Tests

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests with UI mode
npx playwright test --ui

# Run specific test file
npx playwright test tests/login.spec.ts

# Run tests with headed browsers
npx playwright test --headed
```

## Test Scenarios

1. **Authentication Tests**
   - Login with valid credentials
   - Login with invalid credentials
   - Register new user

2. **Todo Item Tests**
   - Create a new todo item
   - Edit an existing todo item
   - Delete a todo item
   - Mark todo item as completed

3. **Data Validation Tests**
   - Verify todo items persist after refresh
   - Verify proper error messages for invalid inputs
   - Verify completed items show correctly

## Test Design Pattern

These tests follow the Page Object Model (POM) design pattern to separate test logic from page interactions. This makes tests more maintainable and easier to update when the UI changes.

Each page has its own class that encapsulates the selectors and actions that can be performed on that page.

## CI/CD Integration

These tests can be integrated into a CI/CD pipeline. Example GitHub Actions workflow is included in the `.github/workflows` directory.
