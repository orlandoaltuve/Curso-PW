// import { test, expect } from '@playwright/test';


// const REPO = 'Repoloco'
// const USER = 'orlandoaltuve'

// test.beforeAll(async ({ request }) => {
//     const response = await request.post('user/repos', {
//         data: {
//             name: REPO
//         }
//     });
//     expect(response.ok()).toBeTruthy();
// })

// test('Puedo crear un bug en el repo', async ({ request }) => {
//     const title = '[Bug] Explotó todo';
//     const body = 'Estamos perdidirijillos!';

//     const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
//         data: { title, body }
//     });

//     expect(newIssue.status()).toBe(201);

//     // Espera a que GitHub indexe el nuevo issue
//     await expect.poll(async () => {
//         const resp = await request.get(`/repos/${USER}/${REPO}/issues`);
//         const json = await resp.json();
//         return json;
//     }).toContainEqual(expect.objectContaining({
//         title,
//         body
//     }));
// });

// // test('Puedo crear un bug en el repo', async ({ request }) => {
// //     const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
// //         data: {
// //             title: '[Bug] Explotó todo',
// //             body: 'Estamos perdidirijillos!',
// //         }
// //     });
// //     expect(newIssue.status()).toBe(201);
// //     // const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
// //     // expect(issues.ok()).toBeTruthy();
// //     // expect(await issues.json()).toContainEqual(expect.objectContaining({
// //     //     title: '[Bug] Explotó todo',
// //     //     body: 'Estamos perdidirijillos!'
// //     // }));
// //     const issues = await expect.poll(async () => {
// //         const resp = await request.get(`/repos/${USER}/${REPO}/issues`);
// //         const json = await resp.json();
// //         return json;
// //     }, {
// //         timeout: 3000, // hasta 3 segundos
// //         intervals: [200, 400, 800, 1200] // reintentos
// //     });

// //     expect(issues).toContainEqual(expect.objectContaining({
// //         title: '[Bug] Explotó todo',
// //         body: 'Estamos perdidirijillos!'
// //     }));
// // });

// // test('Puedo crear un feature request', async ({ request }) => {
// //     const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
// //         data: {
// //             title: '[Feature] Quiero que haga helados',
// //             body: 'Estaría buenísimo que el repo haga helados 🍦',
// //         }
// //     });
// //     expect(newIssue.ok()).toBeTruthy();

// //     const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
// //     expect(issues.ok()).toBeTruthy();
// //     expect(await issues.json()).toContainEqual(expect.objectContaining({
// //         title: '[Feature] Quiero que haga helados',
// //         body: 'Estaría buenísimo que el repo haga helados 🍦'
// //     }));
// // });

// // test.afterAll(async ({ request }) => {
// //     const response = await request.delete(`/repos/${USER}/${REPO}`);
// //     expect(response.ok()).toBeTruthy();
// // });