const { test, expect, beforeEach, describe } = require('@playwright/test')


test('Login form is shown', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  const locator = await page.getByText('Log in to application')

  await expect(locator).toBeVisible()
})