/**
 * Image snapshot test for the cart checkout page.
 * @author Andrew Jarombek
 * @since 4/3/2021
 */

import puppeteer, { ElementHandle } from 'puppeteer';

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

  it('displays items in the cart correctly', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8082/');
    const addToCartButtons: ElementHandle[] = await page.$$('.add-to-cart');
    await addToCartButtons[0].click();
    await addToCartButtons[1].click();
    await addToCartButtons[2].click();
    await addToCartButtons[3].click();

    const cartIcon: ElementHandle = await page.$('.cart');
    await cartIcon.click();
    await page.waitForSelector('.checkout-item');
    await page.waitForTimeout(500);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({ customDiffConfig: { threshold: 0.3 } });

    await page.$eval('.grand-total', (e) => {
      e.scrollIntoView();
    });

    const imageBottomOfPage = await page.screenshot();
    expect(imageBottomOfPage).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
