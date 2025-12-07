import { test, expect } from '@playwright/test';
import { title } from 'process';

const REPO = 'Curso-PW'
const USER = 'orlandoaltuve'

test('Se puede crear un Issue en el repositorio de Github ', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] reporte 7',
            body: 'Descripción del bug',
        }
    });
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] reporte 7',
        body: 'Descripción del bug',
    }));
});

test('Puedo crear una request de feature', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] request 7',
            body: 'Descripción del feature',
        }
    });
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] request 7',
        body: 'Descripción del feature',
    }));
})

