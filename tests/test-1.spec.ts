import { test, Browser, Page, expect } from '@playwright/test';

test.describe('navegacion en https://cienaga.qa.tiendadepuntos.com/', () => {

  test('Los links principales redirigen correcctamente', async ({ page }) => {
    await test.step('Estando en https://cienaga.qa.tiendadepuntos.com/ ', async () => {
      await page.goto("https://cienaga.qa.tiendadepuntos.com");
      await expect(page).toHaveTitle('Tienda de Puntos')
      
    })
    
    
  })
  
})

