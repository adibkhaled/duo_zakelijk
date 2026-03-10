import { Page, expect } from '@playwright/test';

export class DuoZakelijkPage {
  readonly page: Page;
  private readonly baseUrl = 'https://duo.nl/zakelijk/';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to DUO Zakelijk page
   */
  async navigateToDuo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on a navigation link by name
   */
  async clickNavigationLink(linkName: string): Promise<void> {
    await this.page.getByRole('link', { name: linkName }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click the home button to return to main page
   */
  async clickHomeButton(): Promise<void> {
    await this.page.getByTitle('Home', { exact: true }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify a link is visible on the page
   */
  async verifyLinkIsVisible(linkName: string): Promise<void> {
    const link = this.page.getByRole('link', { name: linkName });
    await expect(link).toBeVisible();
  }

  /**
   * Verify a heading is visible on the page
   */
  async verifyHeadingIsVisible(headingName: string): Promise<void> {
    const heading = this.page.getByRole('heading', { name: headingName });
    await expect(heading).toBeVisible();
  }

  /**
   * Verify search input field is visible
   */
  async verifySearchInputIsVisible(): Promise<void> {
    const searchInput = this.page.getByRole('textbox', { name: 'Zoek' });
    await expect(searchInput).toBeVisible();
  }

  /**
   * Perform a search with the given term
   */
  async performSearch(searchTerm: string): Promise<void> {
    const searchInput = this.page.getByRole('textbox', { name: 'Zoek' });
    await searchInput.click();
    await searchInput.fill(searchTerm);
    
    const searchButton = this.page.getByRole('button', { name: 'Zoek' });
    await searchButton.click();
    
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify search result contains expected text
   */
  async verifySearchResultContains(expectedText: string): Promise<void> {
    // Wait for search results to load
    await this.page.waitForLoadState('networkidle');
    
    // Check if page contains the expected text
    const content = await this.page.content();
    expect(content).toContain(expectedText);
  }

  /**
   * Verify search result link is visible
   */
  async verifySearchResultLinkVisible(linkName: string): Promise<void> {
    const resultLink = this.page.getByRole('link', { name: linkName });
    await expect(resultLink).toBeVisible({ timeout: 5000 });
  }

  /**
   * Get all links on the current page
   */
  async getAllLinks(): Promise<string[]> {
    const links = await this.page.getByRole('link').all();
    const linkTexts: string[] = [];
    
    for (const link of links) {
      const text = await link.textContent();
      if (text) {
        linkTexts.push(text.trim());
      }
    }
    
    return linkTexts;
  }

  /**
   * Verify link exists in page
   */
  async verifyLinkExists(linkName: string): Promise<boolean> {
    const links = await this.getAllLinks();
    return links.some(link => link.includes(linkName));
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Navigate to a specific section and verify heading
   */
  async navigateToSectionAndVerify(
    linkName: string,
    expectedHeading: string
  ): Promise<void> {
    await this.clickNavigationLink(linkName);
    await this.verifyHeadingIsVisible(expectedHeading);
  }

  /**
   * Search and verify result contains expected text
   */
  async searchAndVerifyResult(
    searchTerm: string,
    expectedResult: string
  ): Promise<void> {
    await this.performSearch(searchTerm);
    await this.verifySearchResultContains(expectedResult);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Verify page is loaded and contains main content
   */
  async verifyPageIsLoaded(): Promise<void> {
    const zakelijkLink = this.page.getByRole('link', { name: 'Zakelijk' });
    await expect(zakelijkLink).toBeVisible();
  }
}
