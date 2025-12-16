import { test, Browser, Page, expect } from '@playwright/test';
import { SanboxPage } from './Pages/SandboxPage';

test.describe('Acciones en el automation Sambox', () => {
    test('Clic en boton ID dinamico', async ({ page }) => {

        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Puedo hacer clic en el boton con ID dinamico  ', async () => {
            await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
            await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();

            //otra forma 
            //const botonDinamico= page.getByRole('button', { name: 'Hacé click para generar un ID' })
            //await botonDinamico.click();
        })

    })

    test('Lleno un campo de texto en Automation Sanbox', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })
        await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }), 'El campo de texto no admite edición').toBeEditable();
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill('Estoy aprendiendo playwright ');
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }),).toHaveValue('Estoy aprendiendo playwright ');
        })

    })

    test('Puedo seleccionar y deseleccionar un checkbox en el Sanbox', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Puedo selecccionar el checkbox para pasta', async () => {
            const sandbox = new SanboxPage(page);
           // await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
           await sandbox.checkPasta();

            await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
        })

        await test.step('Puedo desseleccionar el checkbox para pasta', async () => {
            await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
            
            await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }), 'El checkbox estaba seleccionado').not.toBeChecked();
        })


    })

    test('Puedo seleccionar un radio buttons', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Puedo seleccionar el button para SI', async () => {
            await page.getByRole('radio', { name: 'Si' }).check();
            await page.getByRole('radio', { name: 'No' }).check();
            await expect(page.getByRole('radio', { name: 'No' }), 'El radio button no se seleccionó').toBeChecked();
        })


    })

    test('Puedo seleccionar un item del dropdown', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Selecciono un deporte del dropdown', async () => {
            await page.getByLabel('Dropdown').selectOption('Fútbol');
        })

    })

    test('Los items del dropddown son los esperados', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })
        await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
            const deportes = ['Fútbol', 'Tennis', 'Basketball', 'Baseball']

            for (let opcion of deportes) {
                const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`)
                if (elemento) {
                    console.log(`La Opcion ${opcion} está presente en la lista`);
                } else {
                    throw new Error(`La Opción ${opcion} no está presente en la lista`);
                }
            }

            // esto no funciona
            //const dropDownDeportes= page.locator('formBasicSelect')
            // await expect(dropDownDeportes).toHaveValues([/Fútbol/,/Tennis/,/Basketball/]);
        })

    })

    test('Puedo seleccionar un dia del dropdown dias de la semana', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Selecciono un dia de la semana del dropdown', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            await page.getByRole('link', { name: 'Miércoles' }).click();
        })

    })

    test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática ', async () => {
            const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

            expect(valoresColumnaNombres).toEqual(nombresEsperados);
        })

    })

    test('Validacion que todos los valores cambian en la tabla dinamica luego de un reload', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Valido que los valores cambian al hacer un reload', async () => {
            // creamos un arreglo con todos los calores de la tabla dinamica
            const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresTablaDinamica);

            // hacemos una recarga para que cambien los valores 
            await page.reload();

            // cramos un segundo arreglo con los valores luego de la recarga 
            const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresPostReload);


            //vaidamos que todos los valores cambiaron para cada celda 
            expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
        })

    })

    test('Ejemplo de Soft Assertions ', async ({ page }) => {
        await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Valido que los elementos de los checkboxes son los correctos ', async () => {
            await expect.soft(page.getByText('Pizza 🍕'),'No se encontró el elemento pizza').toBeVisible();
            await expect.soft(page.getByText('Hamburguesa 🍔'),'No se encontró el elemento Hamburguesa').toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta').toBeVisible();
            await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰'),'No se encontró el elemento Torta').toBeVisible();
        })

    })

    test('Validando dentro de un popup', async ({ page }) => {
        test.info().annotations.push({
            type: 'User Story 123123',
            description: 'El usuario puede acceder al pop up y cerrarlo'

        })
        
         await test.step('Dado que navego al Sanbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Cuando hago clic en el boton Mostrar popup', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
            await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: 'image/png',
            })

        })
        
        await test.step('Puedo Validadar un elemento deltro del popup', async () => {
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!'), 'No existe el texto buscado').toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await page.getByRole('button', { name: 'Cerrar' }).click();
        })
        
    })
    





})
