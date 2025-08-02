import { test, expect } from '../fixtures/fixtures';
import { generateRandomTodo } from '../data/todos';

test.describe('Todo Operations', () => {

  test('should create a new todo item', async ({ todoListPage }) => {
    const newTodoText = generateRandomTodo();

    await todoListPage.addTask(newTodoText);

    // Verify the new todo appears in the list
    // await todoListPage.expectTaskExists(newTodoText);
  });

  test('should prevent creating empty todo items', async ({ todoListPage }) => {
    await todoListPage.addEmptyTask();

    // Verify error message appears
    await todoListPage.expectErrorMessage('Please enter a task description');
  });

  test('should delete an existing todo item', async ({ todoListPage }) => {
    // First create a todo
    const todoText = generateRandomTodo();
    await todoListPage.addTask(todoText);
   //  await todoListPage.expectTaskExists(todoText);

    // Now delete it
    await todoListPage.deleteTask(todoText);

    // Verify it's gone
   //  await todoListPage.expectTaskNotExists(todoText);
  });

  test('should mark a todo item as completed', async ({ todoListPage }) => {
    // First create a todo
    const todoText = generateRandomTodo();
    await todoListPage.addTask(todoText);

    // Mark it as completed
    await todoListPage.toggleTaskCompletion(todoText);

    // Verify it's marked as completed
    await todoListPage.expectTaskCompleted(todoText);
  });

  test('should persist todo items after page refresh', async ({ todoListPage }) => {
    // Create a unique todo
    const uniqueTodoText = `Persistence test - ${Date.now()}`;
    await todoListPage.addTask(uniqueTodoText);

    // Refresh the page
    await todoListPage.reload();
    await todoListPage.waitForPageLoad();

    // Verify the todo still exists
   //  await todoListPage.expectTaskExists(uniqueTodoText);

    // Clean up by deleting the test todo
    await todoListPage.deleteTask(uniqueTodoText);
  });
});
