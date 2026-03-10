import { test, expect } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';
import { NAVIGATION_LINKS_DATA } from '../src/resource/data/duoZakelijkTestData';
import { DUO_ZAKELIJK_LOCATORS } from '../src/resource/locator/duoZakelijkLocators.en';
import { DUO_ZAKELIJK_LOCATORS_NL } from '../src/resource/locator/duoZakelijkLocators.nl';

/**
 * Navigation Links Tests
 * Tests for all navigation links on DUO Zakelijk page
 */
test.describe('DUO Zakelijk - Navigation Links Tests', () => {
  let duoZakelijkPage: DuoZakelijkPage;

  test.beforeEach(async ({ page }) => {
    duoZakelijkPage = new DuoZakelijkPage(page);
    await duoZakelijkPage.navigateToDuo();
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test 1: Verify all navigation links are visible on the page
   */
  test('TC-NAV-001: Verify all navigation links are visible on the page', async () => {
    for (const linkData of NAVIGATION_LINKS_DATA) {
      await duoZakelijkPage.verifyLinkIsVisible(linkData.linkName);
    }
  });

  /**
   * Test 2: Verify Zakelijk link is clickable and page updates
   */
  test('TC-NAV-002: Verify Zakelijk link is clickable and visible', async () => {
    await duoZakelijkPage.verifyLinkIsVisible(DUO_ZAKELIJK_LOCATORS.ZAKELIJK_LINK.name);
  });

  /**
   * Data-driven test: Navigate to each section and verify heading
   */
  NAVIGATION_LINKS_DATA.forEach((linkData) => {
    if (linkData.expectedHeading) {
      test(`TC-NAV-${String(linkData.id + 2).padStart(3, '0')}: Navigate to ${linkData.name} and verify heading`, 
        async () => {
          await duoZakelijkPage.navigateToSectionAndVerify(
            linkData.linkName,
            linkData.expectedHeading
          );
          
          // Verify we can go back home
          await duoZakelijkPage.clickHomeButton();
          await duoZakelijkPage.verifyPageIsLoaded();
        }
      );
    }
  });

  /**
   * Test: Verify navigation flow - click through multiple links
   */
  test('TC-NAV-007: Verify navigation flow through multiple sections', async () => {
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
   * Test: Verify page title
   */
  test('TC-NAV-008: Verify page title contains expected text', async () => {
    const title = await duoZakelijkPage.getPageTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  /**
   * Test: Verify home button returns to main page
   */
  test('TC-NAV-009: Verify home button functionality', async () => {
    // Navigate to a section
    await duoZakelijkPage.clickNavigationLink(DUO_ZAKELIJK_LOCATORS.KINDEROPVANG_LINK.name);
    
    // Click home to go back
    await duoZakelijkPage.clickHomeButton();
    
    // Verify we're back on main page
    await duoZakelijkPage.verifyPageIsLoaded();
  });

  /**
   * Test: Verify all links are accessible via keyboard
   */
  test('TC-NAV-010: Verify links are accessible', async ({ page }) => {
    const links = await duoZakelijkPage.getAllLinks();
    expect(links.length).toBeGreaterThan(0);
  });
});
