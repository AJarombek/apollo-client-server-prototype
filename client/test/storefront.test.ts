/**
 * Image snapshot test for the storefront (home) page.
 * @author Andrew Jarombek
 * @since 4/3/2021
 */

import puppeteer, { ElementHandle } from 'puppeteer';

describe('Snapshot Image tests for the storefront page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('displays page correctly', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8082/');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it('displays page with items in cart correctly', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8082/');
    const addToCartButtons: ElementHandle[] = await page.$$('.add-to-cart');
    await addToCartButtons[0].click();
    await addToCartButtons[1].click();
    await addToCartButtons[2].click();
    await addToCartButtons[3].click();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it('displays flower modals correctly', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8082/');
    const flowerCardTitle: ElementHandle = await page.$('.flower-card > img');
    await flowerCardTitle.click();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({ customDiffConfig: { threshold: 0.3 } });
  });

  afterAll(async () => {
    await browser.close();
  });
});
