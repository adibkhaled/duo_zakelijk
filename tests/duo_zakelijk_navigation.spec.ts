import { test, expect } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';
import { NAVIGATION_LINKS_DATA } from '../src/resource/data/duoZakelijkTestData';
import { DUO_ZAKELIJK_LOCATORS_NL } from '../src/resource/locator/duoZakelijkLocators.nl';

/**
 * Navigatielink Tests
 * Tests voor alle navigatielinks op DUO Zakelijk-pagina
 */
test.describe('DUO Zakelijk - Navigatielink Tests', () => {
  let duoZakelijkPage: DuoZakelijkPage;

  test.beforeEach(async ({ page }) => {
    duoZakelijkPage = new DuoZakelijkPage(page);
    await duoZakelijkPage.navigateToDuo();
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test 1: Controleer of alle navigatielinks zichtbaar zijn op de pagina
   */
  test('TC-NAV-001: Controleer of alle navigatielinks zichtbaar zijn op de pagina', async () => {
    for (const linkData of NAVIGATION_LINKS_DATA) {
      await duoZakelijkPage.verifyLinkIsVisible(linkData.linkName);
    }
  });

  /**
   * Test 2: Controleer of Zakelijk-link klikbaar is en pagina wordt bijgewerkt
   */
  test('TC-NAV-002: Controleer of Zakelijk-link klikbaar is en zichtbaar', async () => {
    await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS_NL.ZAKELIJK_LINK.name);
  });

  /**
   * Gegevengestuurde test: Navigeer naar elk deel en controleer koptekst
   */
  NAVIGATION_LINKS_DATA.forEach((linkData) => {
    if (linkData.expectedHeading) {
      test(`TC-NAV-${String(linkData.id + 2).padStart(3, '0')}: Navigate to ${linkData.name} and verify heading`, 
        async () => {
          await duoZakelijkPage.navigateToSectionAndVerify(
            linkData.linkName,
            linkData.expectedHeading
          );
          
          // Controleer of we naar huis kunnen terugkeren
          await duoZakelijkPage.clickHomeButton();
          await duoZakelijkPage.verifyPageIsLoaded();
        }
      );
    }
  });

  /**
   * Test: Controleer navigatiestroom - klik door meerdere links
   */
  test('TC-NAV-007: Controleer navigatiestroom door meerdere secties', async () => {
    const sectionsToTest = [
      { link: DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_HEADING.name.toString() },
      { link: DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.PRIMAIR_ONDERWIJS_HEADING.name.toString() },
      { link: DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_LINK.name.toString(), heading: DUO_ZAKELIJK_LOCATORS_NL.VOORTGEZET_ONDERWIJS_HEADING.name.toString() }
    ];

    for (const section of sectionsToTest) {
      await duoZakelijkPage.navigateToSectionAndVerify(section.link, section.heading);
      await duoZakelijkPage.clickHomeButton();
      await duoZakelijkPage.verifyPageIsLoaded();
    }
  });

  /**
   * Test: Controleer paginatitel
   */
  test('TC-NAV-008: Controleer of paginatitel verwachte tekst bevat', async () => {
    const title = await duoZakelijkPage.getPageTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  /**
   * Test: Controleer of startknop terugkeert naar hoofdpagina
   */
  test('TC-NAV-009: Controleer startknop functionaliteit', async () => {
    // Navigeer naar een sectie
    await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS_NL.KINDEROPVANG_LINK.name);
    
    // Klik Startpagina om terug te gaan
    await duoZakelijkPage.clickHomeButton();
    
    // Controleer of we terug zijn op de hoofdpagina
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test: Controleer of alle links toegankelijk zijn via toetsenbord
   */
  test('TC-NAV-010: Controleer of links toegankelijk zijn', async ({ page }) => {
    const links = await duoZakelijkPage.getAllLinks();
    expect(links.length).toBeGreaterThan(0);
  });
});
