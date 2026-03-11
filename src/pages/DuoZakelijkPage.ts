import { Page, expect } from '@playwright/test';

export class DuoZakelijkPage {
  readonly page: Page;
   private readonly pathZakelijk = 'zakelijk';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigeer naar DUO Zakelijk pagina
   */
  async navigateToDuo(): Promise<void> {
    await this.page.goto(this.pathZakelijk);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Klik op een navigatielink op naam
   */
  async clickNavigationLink(linkName: string): Promise<void> {
    await this.page.getByRole('link', { name: linkName }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Klik op de startknop om terug te gaan naar de hoofdpagina
   */
  async clickHomeButton(): Promise<void> {
    await this.page.getByTitle('Home', { exact: true }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Controleer of een link zichtbaar is op de pagina
   */
  async verifyLinkIsVisible(linkName: string): Promise<void> {
    const link = this.page.getByRole('link', { name: linkName });
    await expect(link).toBeVisible();
  }

  /**
   * Controleer of een koptekst zichtbaar is op de pagina
   */
  async verifyHeadingIsVisible(headingName: string): Promise<void> {
    const heading = this.page.getByRole('heading', { name: headingName });
    await expect(heading).toBeVisible();
  }

  /**
   * Controleer of het zoekveld zichtbaar is
   */
  async verifySearchInputIsVisible(): Promise<void> {
    const searchInput = this.page.getByRole('textbox', { name: 'Zoek' });
    await expect(searchInput).toBeVisible();
  }

  /**
   * Voer een zoekopdracht uit met de gegeven term
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
   * Controleer of zoekresultaat verwachte tekst bevat
   */
  async verifySearchResultContains(expectedText: string): Promise<void> {
    // Wacht tot zoekresultaten zijn geladen
    await this.page.waitForLoadState('networkidle');
    
    // Controleer of pagina de verwachte tekst bevat
    const content = await this.page.content();
    expect(content).toContain(expectedText);
  }

  /**
   * Controleer of zoekresultaatlink zichtbaar is
   */
  async verifySearchResultLinkVisible(linkName: string): Promise<void> {
    const resultLink = this.page.getByRole('link', { name: linkName });
    await expect(resultLink).toBeVisible({ timeout: 5000 });
  }

  /**
   * Haal alle links op de huidige pagina op
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
   * Controleer of link op pagina bestaat
   */
  async verifyLinkExists(linkName: string): Promise<boolean> {
    const links = await this.getAllLinks();
    return links.some(link => link.includes(linkName));
  }

  /**
   * Haal huidige pagina-URL op
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Navigeer naar een specifieke sectie en controleer de koptekst
   */
  async navigateToSectionAndVerify(
    linkName: string,
    expectedHeading: string
  ): Promise<void> {
    await this.clickNavigationLink(linkName);
    await this.verifyHeadingIsVisible(expectedHeading);
  }

  /**
   * Zoekopdracht uitvoeren en controleer of resultaat verwachte tekst bevat
   */
  async searchAndVerifyResult(
    searchTerm: string,
    expectedResult: string
  ): Promise<void> {
    await this.performSearch(searchTerm);
    await this.verifySearchResultContains(expectedResult);
  }

  /**
   * Haal paginatitel op
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wacht tot element zichtbaar is
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Controleer of pagina is geladen en bevat hoofdinhoud
   */
  async verifyPageIsLoaded(): Promise<void> {
    const zakelijkLink = this.page.getByRole('link', { name: 'Zakelijk' });
    await expect(zakelijkLink).toBeVisible();
  }
}
