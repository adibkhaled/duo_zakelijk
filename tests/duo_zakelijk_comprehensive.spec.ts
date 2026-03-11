import { test, expect } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';
import { DUO_ZAKELIJK_LOCATORS_NL } from '../src/resource/locator/duoZakelijkLocators.nl';
import { SEARCH_DATA } from '../src/resource/data/duoZakelijkTestData';

/**
 * DUO Zakelijk - Uitgebreide Tests
 * Complete testsuite voor DUO Zakelijk-pagina inclusief navigatie en zoeken
 * Gereviseerde versie van test-2.spec.ts met Page Object Model
 */
test.describe('DUO Zakelijk - Uitgebreide Tests', () => {
  let duoZakelijkPage: DuoZakelijkPage;

  test.beforeEach(async ({ page }) => {
    duoZakelijkPage = new DuoZakelijkPage(page);
    await duoZakelijkPage.navigateToDuo();
  });

  /**
   * Testsuite 1: Pagina laden en beginwaarde
   */
  test.describe('Testsuite 1: Pagina laden en beginwaarde', () => {
    test('TC-INITIAL-001: Pagina moet succesvol laden', async () => {
      await duoZakelijkPage.verifyPageIsLoaded();
    });

    test('TC-INITIAL-002: Zoekinvoerveld moet zichtbaar zijn bij laden', async () => {
      await duoZakelijkPage.verifySearchInputIsVisible();
    });

    test('TC-INITIAL-003: Controleer dat pagina-URL correct is', async () => {
      const url = await duoZakelijkPage.getCurrentUrl();
      expect(url).toContain('duo.nl/zakelijk');
    });
  });

  /**
   * Testsuite 2: Navigatie - Kinderopvang
   */
  test.describe('Testsuite 2: Navigatie - Kinderopvang', () => {
    test('TC-KINDEROPVANG-001: Klik Kinderopvang-link en controleer koptekst', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name);
    });

    test('TC-KINDEROPVANG-002: Retourneer naar startpagina na Kinderopvang-navigatie', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name);
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Testsuite 3: Navigatie - Primair onderwijs
   */
  test.describe('Testsuite 3: Navigatie - Primair onderwijs', () => {
    test('TC-PRIMAIR-001: Klik Primair onderwijs-link en controleer koptekst', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name);
    });

    test('TC-PRIMAIR-002: Retourneer naar startpagina na Primair onderwijs-navigatie', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name);
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Testsuite 4: Navigatie - Voortgezet onderwijs
   */
  test.describe('Testsuite 4: Navigatie - Voortgezet onderwijs', () => {
    test('TC-VOORTGEZET-001: Klik Voortgezet onderwijs-link en controleer koptekst', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name);
    });

    test('TC-VOORTGEZET-002: Retourneer naar startpagina na Voortgezet onderwijs-navigatie', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name);
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Testsuite 5: Zoekfunctionaliteit
   */
  test.describe('Testsuite 5: Zoekfunctionaliteit', () => {
    test('TC-SEARCH-BASIC-001: Controleer of zoekinvoerveld zichtbaar is', async () => {
      await duoZakelijkPage.verifySearchInputIsVisible();
    });

    test('TC-SEARCH-BASIC-002: Zoek naar kinderopvang en controleer resultaten', async () => {
    //   await duoZakelijkPage.performSearch('kinderopvang');
    await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      
      // Controleer of zoekresultaten worden weergegeven
      const content = await duoZakelijkPage.page.content();
      expect(content).toContain(SEARCH_DATA[0].expectedResultPartial.toLowerCase());
    });

    test('TC-SEARCH-BASIC-003: Controleer of zoekresultaat verwachte inhoud bevat', async () => {
      await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      await duoZakelijkPage.verifySearchResultContains(SEARCH_DATA[0].expectedResultPartial.toString());
    });

    test('TC-SEARCH-BASIC-004: Retourneer naar startpagina vanuit zoekresultaten', async () => {
      await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Testsuite 6: Complete gebruikerstraject
   */
  test.describe('Testsuite 6: Complete gebruikerstraject', () => {
    test('TC-JOURNEY-001: Complete gebruikerstraject met navigatie en zoeken', async () => {
      // Controleer of pagina is geladen
      await duoZakelijkPage.verifyPageIsLoaded();

      // Navigeer naar Kinderopvang
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name);

      // Go home
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();

      // Navigeer naar Primair onderwijs
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name);

      // Go home
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();

      // Navigeer naar Voortgezet onderwijs
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name);

      // Go home
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();

      // Controleer zoekfunctionaliteit
      await duoZakelijkPage.verifySearchInputIsVisible();
      await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      await duoZakelijkPage.verifySearchResultContains(SEARCH_DATA[0].expectedResultPartial.toString());
    });

    test('TC-JOURNEY-002: Navigatiestroom door alle secties', async () => {
      const sections = [
        { link: DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name.toString() },
        { link: DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name.toString() },
        { link: DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name.toString() }
      ];

      for (const section of sections) {
        await duoZakelijkPage.navigateToSectionAndVerify(section.link, section.heading);
        await duoZakelijkPage.clickHomeButton();
      }

      // Controleer eindsituatie
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Testsuite 7: Linkverificatie
   */
  test.describe('Testsuite 7: Linkverificatie', () => {
    test('TC-LINKS-001: Controleer of Zakelijk-link zichtbaar is', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.ZAKELIJK_LINK.name);
    });

    test('TC-LINKS-002: Controleer of Kinderopvang-link zichtbaar is', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
    });

    test('TC-LINKS-003: Controleer of Primair onderwijs-link zichtbaar is', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
    });

    test('TC-LINKS-004: Controleer of Voortgezet onderwijs-link zichtbaar is', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
    });

    test('TC-LINKS-005: Haal alle links op pagina op', async () => {
      const links = await duoZakelijkPage.getAllLinks();
      expect(links.length).toBeGreaterThan(0);
      
      // Controleer of verwachte links bestaan
      expect(links.some(link => link.includes(DUO_ZAKELIJK_LOCATORS_NL.ZAKELIJK_LINK.name))).toBeTruthy();
    });
  });
});
