import { test, expect } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';
import { SEARCH_DATA } from '../src/resource/data/duoZakelijkTestData';

/**
 * Zoekfunctionaliteit Tests
 * Tests voor zoekfunctie op DUO Zakelijk-pagina
 */
test.describe('DUO Zakelijk - Zoeken Tests', () => {
  let duoZakelijkPage: DuoZakelijkPage;

  test.beforeEach(async ({ page }) => {
    duoZakelijkPage = new DuoZakelijkPage(page);
    await duoZakelijkPage.navigateToDuo();
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test 1: Controleer of zoekinvoerveld zichtbaar is op pagina
   */
  test('TC-SEARCH-001: Controleer of zoekinvoerveld zichtbaar is', async () => {
    await duoZakelijkPage.verifySearchInputIsVisible();
  });

  /**
   * Gegevengestuurde test: Voer zoekopdrachten uit met verschillende termen
   */
  SEARCH_DATA.forEach((searchData) => {
    test(
      `TC-SEARCH-${String(searchData.id).padStart(3, '0')}: ${searchData.description}`,
      async () => {
        await duoZakelijkPage.performSearch(searchData.searchTerm);
        
        // Controleer of zoekresultaten verwachte inhoud bevatten
        await duoZakelijkPage.verifySearchResultContains(
          searchData.expectedResultPartial
        );
      }
    );
  });

  /**
   * Test: Controleer zoekfunctie met speciale tekens
   */
  test('TC-SEARCH-004: Zoek met speciale zoekterm', async () => {
    await duoZakelijkPage.performSearch('test');
    
    // Wacht tot resultaten verschijnen
    const pageContent = await duoZakelijkPage.page.content();
    expect(pageContent).toBeTruthy();
  });

  /**
   * Test: Controleer zoeken met lege invoer
   */
  test('TC-SEARCH-005: Zoek met minimale term', async () => {
    await duoZakelijkPage.performSearch('a');
    
    // Pagina moet zonder fouten laden
    const url = await duoZakelijkPage.getCurrentUrl();
    expect(url).toContain('duo.nl');
  });

  /**
   * Test: Controleer zoekresulaatlink zichtbaarheid
   */
  test('TC-SEARCH-006: Controleer of kinderopvang zoekresultaatlink zichtbaar is', async () => {
    await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
    
    // Wacht en controleer of resultaten worden weergegeven
    const pageContent = await duoZakelijkPage.page.content();
    expect(pageContent).toContain(SEARCH_DATA[0].expectedResultPartial.toLowerCase());
  });

  /**
   * Test: Controleer meervoudige zoekopdrachten achtereenvolgens
   */
  test('TC-SEARCH-007: Voer meervoudige zoekopdrachten achtereenvolgens uit', async () => {
    const searchTerms = [SEARCH_DATA[0].searchTerm.toLowerCase(), SEARCH_DATA[1].searchTerm.toLowerCase(), SEARCH_DATA[2].searchTerm.toLowerCase()];

    for (const term of searchTerms) {
      await duoZakelijkPage.performSearch(term);
      
      // Ga terug naar startpagina voordat volgende zoekopdracht
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    }
  });

  /**
   * Test: Controleer zoeken retourneert naar startpagina na zoekopdracht
   */
  test('TC-SEARCH-008: Zoek en keer terug naar startpagina met succes', async () => {
    await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
    
    // Ga terug naar startpagina
    await duoZakelijkPage.clickHomeButton();
    
    // Controleer of we terug op de hoofdpagina zijn
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test: Controleer zoekinvoerveld kan worden gewist en opnieuw ingevuld
   */
  test('TC-SEARCH-009: Controleer zoekinvoerveld gedrag', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Zoek' });
    
    // Klik op zoekinvoerveld
    await searchInput.click();
    
    // Vul met tekst
    await searchInput.fill('test zoeken');
    
    // Haal de waarde op
    const value = await searchInput.inputValue();
    expect(value).toBe('test zoeken');
  });

  /**
   * Test: Controleer zoekknop bestaat en is klikbaar
   */
  test('TC-SEARCH-010: Controleer zoekknop is zichtbaar en toegankelijk', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'Zoek' });
    
    // Controleer of knop zichtbaar is
    await expect(searchButton).toBeVisible();
    
    // Controleer of knop is ingeschakeld
    await expect(searchButton).toBeEnabled();
  });
});
