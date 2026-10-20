const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(path.join(__dirname, 'index.html')).href);
    const ui = page.frameLocator('iframe');
    const shot = async name => {
      if (process.env.MOCKUP_SCREENSHOTS === '1') {
        await page.screenshot({ path: path.join(__dirname, 'screenshots', name + '.png'), fullPage: true });
      }
    };
    await ui.locator('[data-action=cupid]').click();
    for (let i = 0; i < 5; i++) await ui.locator('[data-action=suggest]').click();
    assert.equal(await ui.locator('[data-action=suggest]').isDisabled(), true);
    await ui.locator('nav [data-action=home]').click();
    await shot('night');
    await ui.locator('[data-action=day]').click();
    await ui.locator('[data-action=player]').click();
    await ui.locator('[data-action=like]').click();
    assert.match(await ui.locator('#dn-notice').innerText(), /No se ha generado un match/);
    await shot('day');
    await ui.locator('nav [data-action=chat]').click();
    await ui.locator('[data-action=conversation]').click();
    await ui.locator('#dn-message').fill('<b>Local example</b>');
    await ui.locator('[data-action=send]').click();
    assert.equal(await ui.locator('.bubble.mine').innerText(), '<b>Local example</b>');
    assert.equal(await ui.locator('.bubble.mine b').count(), 0);
    await ui.locator('nav [data-action=home]').click();
    await ui.locator('[data-action=social]').click();
    await ui.locator('[data-action=questions]').click();
    await ui.locator('[data-action=nextcard]').click();
    assert.match(await ui.locator('.gamecard').innerText(), /canción/);
    await ui.locator('[data-action=night]').click();
    await ui.locator('[data-action=nightcupid]').click();
    assert.equal(await ui.locator('#dn-mobile').getAttribute('data-mode'), 'night');
    assert.equal(await ui.locator('[data-action=suggest]').isDisabled(), true);
    await page.setViewportSize({ width: 320, height: 1000 });
    const dimensions = await ui.locator('#dn-mobile').evaluate(el => ({ width: el.clientWidth, scroll: el.scrollWidth }));
    assert.ok(dimensions.scroll <= dimensions.width, 'No horizontal overflow at 320px');
    await shot('cupido');
    await ui.locator('nav [data-action=profile]').click();
    await ui.locator('[data-action=reset]').click();
    await ui.locator('[data-action=cupid]').click();
    assert.equal(await ui.locator('[data-action=suggest]').isDisabled(), false);
    assert.match(await ui.locator('.count').innerText(), /5/);
    assert.deepEqual(errors, []);
    console.log('PASS: quota, likes, safe local messages, games, mode switch, reset, narrow layout and runtime errors');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
