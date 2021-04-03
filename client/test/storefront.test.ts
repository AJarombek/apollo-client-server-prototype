/**
 * Image snapshot test for the storefront (home) page.
 * @author Andrew Jarombek
 * @since 4/3/2021
 */

import puppeteer from 'puppeteer';

describe('Snapshot Image tests for the storefront page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('displays the storefront page correctly', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8082/');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
