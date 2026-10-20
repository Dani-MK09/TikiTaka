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
        const viewport = page.viewportSize();
        await page.setViewportSize({ width: viewport.width, height: 2400 });
        await ui.locator('#dn-mobile').evaluate(el => el.ownerDocument.defaultView.scrollTo(0, 0));
        await ui.locator('#dn-mobile').screenshot({ path: path.join(__dirname, 'screenshots', name + '.png') });
        await page.setViewportSize(viewport);
      }
    };
    await ui.locator('[data-action=cupid]').click();
    await ui.locator('#dn-target').selectOption('1');
    const target = await ui.locator('.fixed-person').getAttribute('data-person');
    const candidate = await ui.locator('.candidate-person').getAttribute('data-candidate');
    const bounds = await ui.locator('.candidate-person .art').boundingBox();
    await page.mouse.move(bounds.x + bounds.width * .85, bounds.y + 90);
    await page.mouse.down();
    await page.mouse.move(bounds.x + 10, bounds.y + 93, { steps: 8 });
    await page.mouse.up();
    assert.equal(await ui.locator('.fixed-person').getAttribute('data-person'), target);
    assert.notEqual(await ui.locator('.candidate-person').getAttribute('data-candidate'), candidate);
    assert.equal(await ui.locator('#dn-target').inputValue(), '1');
    await page.setViewportSize({ width: 320, height: 1000 });
    await shot('cupido');
    await page.setViewportSize({ width: 390, height: 1000 });
    for (let i = 0; i < 5; i++) await ui.locator('[data-action=suggest]').click();
    assert.equal(await ui.locator('[data-action=suggest]').isDisabled(), true);
    await ui.locator('[data-action=ranking]').click();
    assert.match(await ui.locator('.stat-big').innerText(), /5/);
    assert.equal(await ui.locator('#progress-panel .listrow').count(), 5);
    await shot('statistics');
    await ui.locator('[data-action=ranktab]').click();
    const nearLeader = await ui.locator('.rank-leader h2').innerText();
    await ui.locator('[data-action=scope-madrid]').click();
    assert.notEqual(await ui.locator('.rank-leader h2').innerText(), nearLeader);
    await ui.locator('[data-action=scope-national]').click();
    assert.equal(await ui.locator('[data-action=scope-national]').getAttribute('aria-pressed'), 'true');
    await shot('ranking');
    await ui.locator('nav [data-action=home]').click();
    await shot('night');
    await ui.locator('[data-action=day]').click();
    await ui.locator('[data-action=player]').click();
    await ui.locator('[data-action=like]').click();
    assert.match(await ui.locator('#dn-notice').innerText(), /Like guardado/);
    await shot('day');
    await ui.locator('nav [data-action=chat]').click();
    await ui.locator('[data-action=conversation]').click();
    await ui.locator('#dn-message').fill('<b>Local example</b>');
    await ui.locator('[data-action=send]').click();
    assert.equal(await ui.locator('.bubble.mine').innerText(), '<b>Local example</b>');
    assert.equal(await ui.locator('.bubble.mine b').count(), 0);
    await ui.locator('nav [data-action=home]').click();
    await ui.locator('[data-action=social]').first().click();
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
    const portraits = await ui.locator('.portrait').evaluateAll(async elements => Promise.all(elements.map(el => new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image.naturalWidth > 0);
      image.onerror = () => resolve(false);
      image.src = getComputedStyle(el).backgroundImage.slice(5, -2);
    }))));
    assert.ok(portraits.length > 0 && portraits.every(Boolean), 'Portrait asset loads');
    await ui.locator('nav [data-action=profile]').click();
    await ui.locator('.about-demo summary').click();
    await ui.locator('[data-action=reset]').click();
    await ui.locator('[data-action=cupid]').click();
    assert.equal(await ui.locator('[data-action=suggest]').isDisabled(), false);
    assert.match(await ui.locator('.count').innerText(), /5/);
    assert.deepEqual(errors, []);
    console.log('PASS: persistent recipient, swipe, statistics, ranking scopes, portraits, quota, likes, safe local messages, games, modes, reset, narrow layout and runtime errors');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
