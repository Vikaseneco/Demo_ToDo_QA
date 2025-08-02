import { v4 as uuidv4 } from 'uuid';

export const validUser = {
  username: 'testuserPW',
  email: 'testuser@example.com',
  password: 'Passwo%&123!',
};

export const invalidUser = {
  username: 'nonexistentuser',
  password: 'wrongpassword',
};

export function generateRandomUser() {
  const uuid = uuidv4().substring(0, 8);
  return {
    username: `user_${uuid}`,
    email: `user_${uuid}@example.com`,
    password: 'Test@123',
  };
}
