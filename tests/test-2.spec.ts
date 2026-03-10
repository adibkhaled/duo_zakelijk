// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://duo.nl/zakelijk/');
//   await page.getByRole('link', { name: 'Zakelijk' }).click();
//   await expect(page.getByRole('link', { name: 'Zakelijk' })).toBeVisible();
//   await page.getByRole('link', { name: 'Kinderopvang' }).click();
//   await expect(page.getByRole('heading', { name: 'Kinderopvang' })).toBeVisible();
//   await page.getByTitle('Home', { exact: true }).click();
//   await page.getByRole('link', { name: 'Primair onderwijs' }).click();
//   await expect(page.getByRole('heading', { name: 'Primair onderwijs' })).toBeVisible();
//   await page.getByTitle('Home', { exact: true }).click();
//   await page.getByRole('link', { name: 'Voortgezet onderwijs' }).click();
//   await expect(page.getByRole('heading', { name: 'Voortgezet onderwijs' })).toBeVisible();
//   await page.getByTitle('Home', { exact: true }).click();
//   await expect(page.getByRole('textbox', { name: 'Zoek' })).toBeVisible();
//   await page.getByRole('textbox', { name: 'Zoek' }).click();
//   await page.getByRole('textbox', { name: 'Zoek' }).fill('kinderopvang');
//   await page.getByRole('button', { name: 'Zoek' }).click();
//   await expect(page.getByRole('link', { name: 'Personenregister Kinderopvang: Koppelen - DUO' })).toBeVisible();
//   await page.getByTitle('Home', { exact: true }).click();
// });