export const todoItems = {
  valid: {
    simple: 'Buy groceries',
    withSpecialChars: 'Complete task #123 (urgent!)',
    long: 'This is a very long todo item that contains more than fifty characters to test the limits of the input field and display capabilities of the application',
  },
  invalid: {
    empty: '',
  }
};

export function generateRandomTodo() {
  const randomId = Math.floor(Math.random() * 10000);
  return `Test todo item ${randomId} - ${new Date().toISOString()}`;
}
