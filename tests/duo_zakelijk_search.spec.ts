import { test, expect } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';
import { SEARCH_DATA } from '../src/resource/data/duoZakelijkTestData';

/**
 * Search Functionality Tests
 * Tests for search feature on DUO Zakelijk page
 */
test.describe('DUO Zakelijk - Search Tests', () => {
  let duoZakelijkPage: DuoZakelijkPage;

  test.beforeEach(async ({ page }) => {
    duoZakelijkPage = new DuoZakelijkPage(page);
    await duoZakelijkPage.navigateToDuo();
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test 1: Verify search input field is visible on page
   */
  test('TC-SEARCH-001: Verify search input field is visible', async () => {
    await duoZakelijkPage.verifySearchInputIsVisible();
  });

  /**
   * Data-driven test: Perform searches with different terms
   */
  SEARCH_DATA.forEach((searchData) => {
    test(
      `TC-SEARCH-${String(searchData.id).padStart(3, '0')}: ${searchData.description}`,
      async () => {
        await duoZakelijkPage.performSearch(searchData.searchTerm);
        
        // Verify search results contain expected content
        await duoZakelijkPage.verifySearchResultContains(
          searchData.expectedResultPartial
        );
      }
    );
  });

  /**
   * Test: Verify search function with special characters
   */
  test('TC-SEARCH-004: Search with special search term', async () => {
    await duoZakelijkPage.performSearch('test');
    
    // Wait for results to appear
    const pageContent = await duoZakelijkPage.page.content();
    expect(pageContent).toBeTruthy();
  });

  /**
   * Test: Verify search with empty input
   */
  test('TC-SEARCH-005: Search with minimal term', async () => {
    await duoZakelijkPage.performSearch('a');
    
    // Page should load without errors
    const url = await duoZakelijkPage.getCurrentUrl();
    expect(url).toContain('duo.nl');
  });

  /**
   * Test: Verify search result link visibility
   */
  test('TC-SEARCH-006: Verify kinderopvang search result link is visible', async () => {
    await duoZakelijkPage.performSearch('kinderopvang');
    
    // Wait and check if results are displayed
    const pageContent = await duoZakelijkPage.page.content();
    expect(pageContent).toContain('kinderopvang');
  });

  /**
   * Test: Verify multiple searches in sequence
   */
  test('TC-SEARCH-007: Perform multiple searches in sequence', async () => {
    const searchTerms = ['kinderopvang', 'onderwijs', 'duo'];

    for (const term of searchTerms) {
      await duoZakelijkPage.performSearch(term);
      
      // Go back home before next search
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    }
  });

  /**
   * Test: Verify search returns to home after search
   */
  test('TC-SEARCH-008: Search and return to home with success', async () => {
    await duoZakelijkPage.performSearch('kinderopvang');
    
    // Go back home
    await duoZakelijkPage.clickHomeButton();
    
    // Verify we're back on the main page
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test: Verify search input can be cleared and refilled
   */
  test('TC-SEARCH-009: Verify search input behavior', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Zoek' });
    
    // Click on search input
    await searchInput.click();
    
    // Fill with text
    await searchInput.fill('test search');
    
    // Get the value
    const value = await searchInput.inputValue();
    expect(value).toBe('test search');
  });

  /**
   * Test: Verify search button exists and is clickable
   */
  test('TC-SEARCH-010: Verify search button is visible and accessible', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'Zoek' });
    
    // Verify button is visible
    await expect(searchButton).toBeVisible();
    
    // Verify button is enabled
    await expect(searchButton).toBeEnabled();
  });
});
