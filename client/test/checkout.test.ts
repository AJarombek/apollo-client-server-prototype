/**
 * Image snapshot test for the cart checkout page.
 * @author Andrew Jarombek
 * @since 4/3/2021
 */

import puppeteer from 'puppeteer';

describe('Snapshot Image tests for the checkout page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('displays the checkout page correctly', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8082/checkout');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
