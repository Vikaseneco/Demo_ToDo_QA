import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
    page: Page;
    url: string;

    protected constructor(page: Page, url = '') {
        this.page = page;
        this.url = url;
    }

    async pause() {
        await this.page.pause();
    }

    async pressEnter() {
        await this.page.keyboard.press('Enter');
    }

    async pressTab() {
        await this.page.keyboard.press('Tab');
    }

    $(selector: string): Locator {
        return this.page.locator(selector);
    }

    async visit(): Promise<void> {
        // await this.page.route(new RegExp('index-CgV-eygn.js'), (route) => {
        //   route.fulfill({ status: 200 });
        // });
        //console.log("Url is: ", process.env.URL+this.url);
        await this.page.goto(this.url || '', { waitUntil: 'load' });
    }

    async reload(): Promise<void> {
        await this.page.reload({ waitUntil: 'load' });
    }

    protected getRoot(identifier: string | RegExp | number, el: Locator): Locator {
        return typeof identifier === 'number' ? el.nth(identifier) : el.filter({ hasText: identifier });
    }
}
