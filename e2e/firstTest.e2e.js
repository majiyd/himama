describe('Himama', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Can view students in class', async () => {
    await expect(element(by.text('Home'))).toBeVisible();
    // time for network call
    await expect(element(by.text('Eggfruit room'))).toBeVisible();
    await element(by.text('Eggfruit room')).tap();
    await expect(element(by.text('Peter Rabbit'))).toBeVisible();
    const status = await element(by.id('Peter Rabbit'));
    await expect(status).toBeVisible();
  });

  it('Can check student and move student', async () => {
    // time for network call
    setTimeout(() => {}, 4000);
    await element(by.text('Eggfruit room')).tap();
    await expect(element(by.text('Peter Rabbit'))).toBeVisible();
    await element(by.id('Peter Rabbit')).tap();
    await expect(element(by.id('Peter Rabbit'))).toBeVisible();

    await element(by.id('Peter Rabbit-move')).tap();
    await expect(element(by.text('Dragon fruit room'))).toBeVisible();
    await element(by.text('Dragon fruit room')).tap();
    await expect(element(by.text('Peter Rabbit'))).not.toBeVisible();

    await element(by.text('Home')).tap();
    await element(by.text('Dragon fruit room ')).tap();
    await expect(element(by.text('Peter Rabbit'))).toBeVisible();
  });

  it('Can Switch between classes', async () => {
    // time for network call
    setTimeout(() => {}, 4000);
    await expect(element(by.text('Eggfruit room'))).toBeVisible();
    await element(by.text('Eggfruit room')).tap();
    await expect(element(by.text('Peter Rabbit'))).toBeVisible();
    await element(by.text('Home')).tap();
    await expect(element(by.text('Peter Rabbit'))).not.toBeVisible();
    await expect(element(by.text('Apple room'))).toBeVisible();
    await element(by.text('Apple room')).tap();
    await expect(element(by.text('Tino Martinez'))).toBeVisible();
  });
});
