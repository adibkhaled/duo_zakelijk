# Quick Start Guide - DUO Zakelijk Playwright Tests

## What Was Created

### ✅ Folder Structure
```
src/
├── resource/
│   ├── locator/
│   │   └── duoZakelijkLocators.nl.ts    (Dutch locators)
│   └── data/
│       └── duoZakelijkTestData.ts       (Test data: links, search terms)
└── pages/
    └── DuoZakelijkPage.ts               (Page Object Model class)
```

### ✅ Test Files Created
1. **duo_zakelijk_navigation.spec.ts** - 10 data-driven tests for links
2. **duo_zakelijk_search.spec.ts** - 10 data-driven tests for search
3. **duo_zakelijk_comprehensive.spec.ts** - 19 complete user journey tests

### ✅ Configuration Updates
- **playwright.config.ts** - Updated to run only on Chrome & Edge (removed Firefox, Safari, and mobile)

### ✅ Documentation
- **TEST_STRUCTURE.md** - Comprehensive guide with all information
- **QUICK_START.md** - This file

## Key Features

✅ **Page Object Model** - All page interactions encapsulated in DuoZakelijkPage class  
✅ **Data-Driven Tests** - Test data separated from test logic  
✅ **Multi-Language Support** - Locators in both English and Dutch  
✅ **39 Total Tests** - Comprehensive coverage of links and search  
✅ **Chrome & Edge Only** - Optimized for modern browsers  
✅ **Organized Structure** - Tests grouped by feature  

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test duo_zakelijk_navigation.spec.ts
```

### Run with UI
```bash
npx playwright test --headed
```

### View Report
```bash
npx playwright show-report
```

## Test Files at a Glance

### Navigation Tests (10 tests)
- Verify all links visible
- Navigate to each section (Kinderopvang, Primair onderwijs, Voortgezet onderwijs)
- Verify headings load correctly
- Test home button functionality
- Multi-section navigation flow

### Search Tests (10 tests)  
- Verify search input visible
- Search for various terms (kinderopvang, onderwijs, duo)
- Verify search results display
- Test search input behavior
- Verify search button functionality

### Comprehensive Tests (19 tests)
- Page load and initial state (3 tests)
- Kinderopvang section (2 tests)
- Primair onderwijs section (2 tests)
- Voortgezet onderwijs section (2 tests)
- Search functionality (4 tests)
- User journey tests (2 tests)
- Link verification (5 tests)

## Page Object Model Methods

```typescript
// Navigation
await page.navigateToDuo();
await page.clickNavigationLink('Kinderopvang');
await page.clickHomeButton();

// Verification
await page.verifyLinkIsVisible('Zakelijk');
await page.verifyHeadingIsVisible('Kinderopvang');
await page.verifyPageIsLoaded();

// Search
await page.verifySearchInputIsVisible();
await page.performSearch('kinderopvang');
await page.verifySearchResultContains('Kinderopvang');

// Utility
const links = await page.getAllLinks();
const url = await page.getCurrentUrl();
const title = await page.getPageTitle();
```

## Data-Driven Approach

### Navigation Data
```typescript
{
  id: 1,
  name: 'Zakelijk',
  linkName: 'Zakelijk',
  expectedVisible: 'Zakelijk'
}
```

### Search Data
```typescript
{
  id: 1,
  searchTerm: 'kinderopvang',
  expectedResultPartial: 'Kinderopvang'
}
```

## Adding New Tests

### 1. Add Test Data
Update `src/resource/data/duoZakelijkTestData.ts`

### 2. Add Page Method (if needed)
Add method to `src/pages/DuoZakelijkPage.ts`

### 3. Create Test
Create `.spec.ts` file in `tests/` directory

Example:
```typescript
import { test } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';

test('My new test', async ({ page }) => {
  const duoPage = new DuoZakelijkPage(page);
  await duoPage.navigateToDuo();
  // ... test code ...
});
```

## Browser Configuration

Currently configured for:
- ✅ Chrome (Chromium)
- ✅ Microsoft Edge
- ❌ Firefox (removed)
- ❌ Safari (removed)
- ❌ Mobile (removed)

To run on specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project="Microsoft Edge"
```

## Test Naming Convention

`TC-{CATEGORY}-{NUMBER}`

Categories:
- `NAV` - Navigation
- `SEARCH` - Search
- `KINDEROPVANG` - Kinderopvang section
- `PRIMAIR` - Primair onderwijs section
- `VOORTGEZET` - Voortgezet onderwijs section
- `JOURNEY` - User journeys
- `LINKS` - Link verification
- `INITIAL` - Page load

## Test Results

Total Tests: **39**  
Chrome & Edge: **Yes** (2 browsers × 39 tests = 78 test runs)  
Data-Driven: **Yes**  
Page Object Model: **Yes**  

## Website Coverage

**URL:** https://duo.nl/zakelijk/

**Features Tested:**
- Navigation links (Zakelijk, Kinderopvang, Primair onderwijs, Voortgezet onderwijs)
- Home button functionality
- Search functionality
- Page load and initial state
- Multi-section navigation flows
- Search with various terms

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Run tests: `npx playwright test`
3. ✅ View results: `npx playwright show-report`
4. ✅ Add more tests as needed following the pattern

## Need Help?

- See **TEST_STRUCTURE.md** for detailed documentation
- Check **PLAYWRIGHT_BASICS.md** for Playwright help
- Visit: https://playwright.dev/docs

---

**Status:** ✅ Complete  
**Browsers:** Chrome, Edge  
**Test Pattern:** Page Object Model + Data-Driven  
**Total Tests:** 39  
**Created:** March 10, 2026
