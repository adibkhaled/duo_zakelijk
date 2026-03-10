# DUO Zakelijk Playwright Tests

This project contains comprehensive Playwright tests for the DUO Zakelijk website (https://duo.nl/zakelijk/) using the Page Object Model (POM) pattern with a data-driven approach.

## Project Structure

```
.
├── package.json
├── playwright.config.ts          # Configuration for Chrome & Edge only
├── README.md
├── playwright-report/            # Generated test reports
│
├── src/
│   ├── resource/
│   │   ├── locator/
│   │   │   ├── duoZakelijkLocators.en.ts    # English locators
│   │   │   └── duoZakelijkLocators.nl.ts    # Dutch locators
│   │   │
│   │   └── data/
│   │       └── duoZakelijkTestData.ts       # Test data (links, search terms, etc.)
│   │
│   └── pages/
│       └── DuoZakelijkPage.ts               # Page Object Model class
│
├── tests/
│   ├── duo_zakelijk_navigation.spec.ts      # Navigation link tests
│   ├── duo_zakelijk_search.spec.ts          # Search functionality tests
│   ├── duo_zakelijk_comprehensive.spec.ts   # Complete user journey tests
│   ├── test-2.spec.ts                       # Original test (kept for reference)
│   └── example.spec.ts
│
└── e2e/
    └── example.spec.ts
```

## Test Files Description

### 1. **duo_zakelijk_navigation.spec.ts**
   - Tests all navigation links on the DUO Zakelijk page
   - Data-driven tests for each section (Kinderopvang, Primair onderwijs, Voortgezet onderwijs)
   - Verifies link visibility and heading display
   - Tests home button functionality
   - **Test Coverage:** 10 test cases

### 2. **duo_zakelijk_search.spec.ts**
   - Tests search functionality on the page
   - Data-driven tests for multiple search terms
   - Verifies search input field and button
   - Tests search with various terms and return to home
   - **Test Coverage:** 10 test cases

### 3. **duo_zakelijk_comprehensive.spec.ts**
   - Complete user journey tests
   - Combines navigation and search tests
   - Organized into logical test suites
   - Tests complete workflows with multiple sections
   - **Test Coverage:** 19 test cases

## Page Object Model (POM) - DuoZakelijkPage Class

The `DuoZakelijkPage` class provides methods for interacting with the page:

### Core Methods:
- `navigateToDuo()` - Navigate to the main page
- `clickNavigationLink(linkName)` - Click a navigation link
- `clickHomeButton()` - Click the home button
- `verifyLinkIsVisible(linkName)` - Verify a link is visible
- `verifyHeadingIsVisible(headingName)` - Verify a heading is displayed
- `verifyPageIsLoaded()` - Verify page loads correctly

### Search Methods:
- `verifySearchInputIsVisible()` - Verify search input is visible
- `performSearch(searchTerm)` - Perform a search
- `verifySearchResultContains(expectedText)` - Verify search results

### Utility Methods:
- `getAllLinks()` - Get all links on the page
- `getCurrentUrl()` - Get current page URL
- `getPageTitle()` - Get page title
- `verifyLinkExists(linkName)` - Check if link exists

## Data-Driven Approach

Test data is organized in `src/resource/data/duoZakelijkTestData.ts`:

### NAVIGATION_LINKS_DATA
```typescript
{
  id: 1,
  name: 'Zakelijk',
  linkName: 'Zakelijk',
  expectedVisible: 'Zakelijk',
  description: 'Navigate to Zakelijk section'
}
```

### SEARCH_DATA
```typescript
{
  id: 1,
  searchTerm: 'kinderopvang',
  expectedResultPartial: 'Kinderopvang',
  description: 'Search for Kinderopvang'
}
```

## Locators

Locators are defined in both English and Dutch for clarity:

- **English:** `src/resource/locator/duoZakelijkLocators.en.ts`
- **Dutch:** `src/resource/locator/duoZakelijkLocators.nl.ts`

## Browsers

Tests are configured to run on:
- **Chrome (Chromium)** 
- **Microsoft Edge**

### Configuration in playwright.config.ts:
```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'Microsoft Edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
]
```

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Tests for Specific File
```bash
npx playwright test duo_zakelijk_navigation.spec.ts
npx playwright test duo_zakelijk_search.spec.ts
npx playwright test duo_zakelijk_comprehensive.spec.ts
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project="Microsoft Edge"
```

### Run Tests with Specific Config
```bash
npx playwright test --config=playwright.config.ts
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with UI (Headed)
```bash
npx playwright test --headed
```

### Generate HTML Report
```bash
npx playwright show-report
```

## Test Naming Convention

Tests follow this naming convention: `TC-{CATEGORY}-{NUMBER}`

**Categories:**
- `NAV` - Navigation links
- `SEARCH` - Search functionality
- `KINDEROPVANG` - Kinderopvang section tests
- `PRIMAIR` - Primair onderwijs section tests
- `VOORTGEZET` - Voortgezet onderwijs section tests
- `JOURNEY` - Complete user journey tests
- `LINKS` - Link verification tests
- `INITIAL` - Initial page load tests

## Test Statistics

| Test File | Total Tests | Data-Driven | Browser Coverage |
|-----------|------------|------------|-----------------|
| duo_zakelijk_navigation.spec.ts | 10 | Yes | Chrome, Edge |
| duo_zakelijk_search.spec.ts | 10 | Yes | Chrome, Edge |
| duo_zakelijk_comprehensive.spec.ts | 19 | Partial | Chrome, Edge |
| **Total** | **39** | **Yes** | **2 browsers** |

## Design Patterns Used

1. **Page Object Model (POM)** - Encapsulates page interactions
2. **Data-Driven Testing** - Tests parameterized with external data
3. **Test Organization** - Grouped by feature in describe blocks
4. **Async/Await** - Modern asynchronous testing patterns
5. **Locator Abstraction** - Centralized locator definitions

## Adding New Tests

### Step 1: Add Test Data
Update `src/resource/data/duoZakelijkTestData.ts` with new test data

### Step 2: Add Locators (if needed)
Update `src/resource/locator/duoZakelijkLocators.en.ts` and `.nl.ts`

### Step 3: Add Page Methods (if needed)
Add new methods to `src/pages/DuoZakelijkPage.ts`

### Step 4: Create Test File
Create a new test file in the `tests/` directory and import the page object

## Best Practices

1. **Always use the Page Object Model** - Don't write page manipulation code directly in tests
2. **Keep locators centralized** - Update locator files, not test files
3. **Use data-driven approach** - Add data to the data file, not hardcoded in tests
4. **Organize by feature** - Group related tests in describe blocks
5. **Use meaningful test names** - Follow the TC-CATEGORY-NUMBER convention
6. **Wait for page loads** - Always wait for network idle after navigation
7. **Clean test data** - Remove obsolete test data entries

## Troubleshooting

### Tests failing on Edge
- Ensure Microsoft Edge is installed on the system
- Use `--project=chromium` to run only Chrome tests

### Locator issues
- Check if the website structure has changed
- Update locators in the locator files
- Use Playwright Inspector to find correct locators

### Search tests failing
- Verify the website search functionality still works
- Check for any changes in the search result page structure

## Contributing

When adding new tests:
1. Follow the existing structure
2. Use the Page Object Model
3. Use data-driven approach where possible
4. Add documentation to this README
5. Update test statistics if adding new test files

## References

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Data-Driven Testing](https://playwright.dev/docs/parametrize)
- [Locators](https://playwright.dev/docs/locators)

---

**Last Updated:** March 10, 2026  
**Test Project:** DUO Zakelijk  
**Target Website:** https://duo.nl/zakelijk/  
**Browsers:** Chrome (Chromium), Microsoft Edge  
