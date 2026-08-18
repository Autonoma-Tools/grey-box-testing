const { test, expect } = require("@playwright/test");

test("promo code SPRING10 is rejected when the cart contains a gift card", async ({ page }) => {
  await page.goto("/checkout");
  await page.getByLabel("Promo code").fill("SPRING10");
  await page.getByRole("button", { name: "Apply" }).click();

  await expect(page.getByText("This code can't be applied to gift cards")).toBeVisible();
});

test("promo code SPRING10 is accepted on an eligible cart", async ({ page }) => {
  await page.goto("/checkout?seed=eligible-cart");
  await page.getByLabel("Promo code").fill("SPRING10");
  await page.getByRole("button", { name: "Apply" }).click();

  await expect(page.getByText("10% off applied")).toBeVisible();
});
