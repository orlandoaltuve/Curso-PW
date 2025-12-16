import { type Locator, type Page } from '@playwright/test';

export class SanboxPage {
    readonly page: Page; // para definir la instacia, contexto de una pagina
    readonly pastaCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pastaCheckbox= page.getByRole('checkbox', { name: 'Pasta 🍝' });

    }

    async checkPasta(){
        await this.pastaCheckbox.check();
    }
}

