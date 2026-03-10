import { test, expect } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';
import { DUO_ZAKELIJK_LOCATORS_NL } from '../src/resource/locator/duoZakelijkLocators.nl';
import { SEARCH_DATA } from '../src/resource/data/duoZakelijkTestData';

/**
 * DUO Zakelijk - Comprehensive Tests
 * Complete test suite for DUO Zakelijk page including navigation and search
 * Refactored version of test-2.spec.ts using Page Object Model
 */
test.describe('DUO Zakelijk - Comprehensive Tests', () => {
  let duoZakelijkPage: DuoZakelijkPage;

  test.beforeEach(async ({ page }) => {
    duoZakelijkPage = new DuoZakelijkPage(page);
    await duoZakelijkPage.navigateToDuo();
  });

  /**
   * Test Suite 1: Page Load and Initial State
   */
  test.describe('Test Suite 1: Page Load and Initial State', () => {
    test('TC-INITIAL-001: Page should load successfully', async () => {
      await duoZakelijkPage.verifyPageIsLoaded();
    });

    test('TC-INITIAL-002: Search input should be visible on load', async () => {
      await duoZakelijkPage.verifySearchInputIsVisible();
    });

    test('TC-INITIAL-003: Verify page URL is correct', async () => {
      const url = await duoZakelijkPage.getCurrentUrl();
      expect(url).toContain('duo.nl/zakelijk');
    });
  });

  /**
   * Test Suite 2: Navigation - Kinderopvang
   */
  test.describe('Test Suite 2: Navigation - Kinderopvang', () => {
    test('TC-KINDEROPVANG-001: Click Kinderopvang link and verify heading', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name);
    });

    test('TC-KINDEROPVANG-002: Return home after Kinderopvang navigation', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name);
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Test Suite 3: Navigation - Primair onderwijs
   */
  test.describe('Test Suite 3: Navigation - Primair onderwijs', () => {
    test('TC-PRIMAIR-001: Click Primair onderwijs link and verify heading', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name);
    });

    test('TC-PRIMAIR-002: Return home after Primair onderwijs navigation', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name);
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Test Suite 4: Navigation - Voortgezet onderwijs
   */
  test.describe('Test Suite 4: Navigation - Voortgezet onderwijs', () => {
    test('TC-VOORTGEZET-001: Click Voortgezet onderwijs link and verify heading', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name);
    });

    test('TC-VOORTGEZET-002: Return home after Voortgezet onderwijs navigation', async () => {
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name);
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Test Suite 5: Search Functionality
   */
  test.describe('Test Suite 5: Search Functionality', () => {
    test('TC-SEARCH-BASIC-001: Verify search input is visible', async () => {
      await duoZakelijkPage.verifySearchInputIsVisible();
    });

    test('TC-SEARCH-BASIC-002: Search for kinderopvang and verify results', async () => {
    //   await duoZakelijkPage.performSearch('kinderopvang');
    await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      
      // Verify search results are displayed
      const content = await duoZakelijkPage.page.content();
      expect(content).toContain(SEARCH_DATA[0].expectedResultPartial.toLowerCase());
    });

    test('TC-SEARCH-BASIC-003: Verify search results contain expected content', async () => {
      await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      await duoZakelijkPage.verifySearchResultContains(SEARCH_DATA[0].expectedResultPartial.toString());
    });

    test('TC-SEARCH-BASIC-004: Return home from search results', async () => {
      await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Test Suite 6: Complete User Journey
   */
  test.describe('Test Suite 6: Complete User Journey', () => {
    test('TC-JOURNEY-001: Complete user journey with navigation and search', async () => {
      // Verify page loaded
      await duoZakelijkPage.verifyPageIsLoaded();

      // Navigate to Kinderopvang
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name);

      // Go home
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();

      // Navigate to Primair onderwijs
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name);

      // Go home
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();

      // Navigate to Voortgezet onderwijs
      await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
      await duoZakelijkPage.verifyHeadingIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name);

      // Go home
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();

      // Verify search functionality
      await duoZakelijkPage.verifySearchInputIsVisible();
      await duoZakelijkPage.performSearch(SEARCH_DATA[0].searchTerm.toLowerCase());
      await duoZakelijkPage.verifySearchResultContains(SEARCH_DATA[0].expectedResultPartial.toString());
    });

    test('TC-JOURNEY-002: Navigation flow through all sections', async () => {
      const sections = [
        { link: DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name.toString() },
        { link: DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name.toString() },
        { link: DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name.toString() }
      ];

      for (const section of sections) {
        await duoZakelijkPage.navigateToSectionAndVerify(section.link, section.heading);
        await duoZakelijkPage.clickHomeButton();
      }

      // Verify final state
      await duoZakelijkPage.verifyPageIsLoaded();
    });
  });

  /**
   * Test Suite 7: Link Verification
   */
  test.describe('Test Suite 7: Link Verification', () => {
    test('TC-LINKS-001: Verify Zakelijk link is visible', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.ZAKELIJK_LINK.name);
    });

    test('TC-LINKS-002: Verify Kinderopvang link is visible', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
    });

    test('TC-LINKS-003: Verify Primair onderwijs link is visible', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name);
    });

    test('TC-LINKS-004: Verify Voortgezet onderwijs link is visible', async () => {
      await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name);
    });

    test('TC-LINKS-005: Get all links on page', async () => {
      const links = await duoZakelijkPage.getAllLinks();
      expect(links.length).toBeGreaterThan(0);
      
      // Verify expected links exist
      expect(links.some(link => link.includes(DUO_ZAKELIJK_LOCATORS_NL.ZAKELIJK_LINK.name))).toBeTruthy();
    });
  });
});
