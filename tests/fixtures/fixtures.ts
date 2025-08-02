import { test as baseTest } from '@playwright/test';
import {LoginPage, RegisterPage, TodoListPage} from "../pages";

export type MyFixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    todoListPage: TodoListPage;
};

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    todoListPage: async ({ page }, use) => {
        await use(new TodoListPage(page));
    },
});

export const expect = test.expect;
