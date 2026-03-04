import { test, expect } from '@playwright/test';

// Verifies that selecting a species from the dropdown displays the correct traits.
test('Search by Species: selecting a species shows its traits', async ({ page }) => {

  // Navigate to the Search by Species page
  await page.goto('/species');

  // Wait for the API to populate the dropdown (more than just the placeholder option)
  await page.waitForFunction(
    () => document.querySelector('select')?.options.length > 1,
    { timeout: 30000 }
  );

  // Locate the dropdown and read the first real species name (index 0 is the placeholder)
  const speciesDropdown = page.locator('select');
  const firstSpeciesOption = speciesDropdown.locator('option').nth(1);
  const selectedSpeciesName = (await firstSpeciesOption.textContent()).trim();

  // Select the species, triggering a second API call to fetch its traits
  await speciesDropdown.selectOption({ index: 1 });

  // The results heading should show "<SpeciesName> Traits"
  await expect(page.locator('h2')).toContainText(`${selectedSpeciesName} Traits`, { timeout: 10000 });

  // At least one trait card should be visible in the results section
  // (CSS Modules transforms class names, so we target section > p directly)
  await expect(page.locator('section p').first()).toBeVisible({ timeout: 5000 });
});


// Verifies that selecting a trait from the dropdown displays the correct species.
test('Search by Trait: selecting a trait shows its species', async ({ page }) => {

  // Navigate to the Search by Trait page
  await page.goto('/traits');

  // Wait for the API to populate the dropdown (more than just the placeholder option)
  await page.waitForFunction(
    () => document.querySelector('select')?.options.length > 1,
    { timeout: 30000 }
  );

  // Locate the dropdown and read the first real trait name (index 0 is the placeholder)
  const traitDropdown = page.locator('select');
  const firstTraitOption = traitDropdown.locator('option').nth(1);
  const selectedTraitName = (await firstTraitOption.textContent()).trim();

  // Select the trait, triggering a second API call to fetch its species
  await traitDropdown.selectOption({ index: 1 });

  // The results heading should show "Species with: <TraitName>"
  await expect(page.locator('h2')).toContainText(`Species with: ${selectedTraitName}`, { timeout: 10000 });

  // At least one species card should be visible in the results section
  await expect(page.locator('section p').first()).toBeVisible({ timeout: 5000 });
});
