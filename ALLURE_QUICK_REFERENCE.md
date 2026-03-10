# Allure Report Quick Reference

## Installation Complete ✅

Allure Report is now fully integrated into your Playwright test project.

### Installed Packages
- ✅ `allure-playwright` - Playwright adapter for Allure
- ✅ `allure-commandline` - CLI tool for generating reports
- ✅ `rimraf` - Utility for cleaning directories

## Quick Start Commands

### 1. Run Tests & Generate Allure Report
```bash
npm test && npm run allure:generate
```

### 2. Run Tests & View Allure Report (opens browser)
```bash
npm test && npm run allure:report
```

### 3. View Last Generated Report
```bash
npm run allure:report
```

### 4. Generate Report Without Opening
```bash
npm run allure:generate
```

### 5. Clean All Allure Data
```bash
npm run allure:clean
```

## Full NPM Scripts Available

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests on Chrome & Edge |
| `npm run test:chromium` | Run tests on Chrome only |
| `npm run test:edge` | Run tests on Edge only |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:headed` | Run tests in headed mode |
| `npm run test:debug` | Run tests in debug mode |
| `npm run report` | View Playwright HTML report |
| `npm run allure:generate` | Generate Allure report |
| `npm run allure:report` | Generate & open Allure report |
| `npm run allure:clean` | Clean Allure results & reports |

## Workflow Example

### Complete Testing Workflow
```bash
# 1. Run all tests and generate reports
npm test

# 2. View Allure report
npm run allure:report

# 3. Or view traditional Playwright report
npm run report

# 4. When done, clean up for next test run
npm run allure:clean
```

### CI/CD Workflow
```bash
# Run tests
npm test

# Generate Allure report
npm run allure:generate

# Report is now available at: allure-report/index.html
# Deploy allure-report folder to your CI/CD reports
```

## Generated Files

### After Running Tests:
```
allure-results/          ← Raw test data (auto-generated)
│
tests/                   ← Test files
playwright-report/       ← Traditional Playwright HTML report
allure-report/          ← Allure HTML report (after running allure:generate)
```

## Allure Report Features

✅ **Overview Dashboard**
- Pass/Fail statistics
- Test execution summary
- Duration information

✅ **Detailed Test Results**
- Individual test outcomes
- Test steps (if added in code)
- Error messages and logs
- Screenshots/attachments

✅ **Trends & History**
- Pass/Fail trends over time
- Test duration trends
- Flaky test detection

✅ **Categorization**
- Group by suite
- Filter by severity
- Filter by status

✅ **Timeline View**
- Sequential execution view
- Parallel execution details
- Test duration breakdown

## Configuration

**Reporter Configuration** (playwright.config.ts):
```typescript
reporter: [
  ['html', { outputFolder: 'playwright-report' }],
  ['allure-playwright', { outputFolder: 'allure-results' }],
],
```

**Output Folders**:
- `allure-results/` - Raw test data
- `allure-report/` - Generated HTML report

**.gitignore**:
```
/allure-results/
/allure-report/
.allure/
```

## Troubleshooting

### "allure: The term 'allure' is not recognized"
**Solution** - Use npm scripts with npx:
```bash
npx allure --version
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

### No report generated
**Checklist**:
- ✅ Did you run tests first? (`npm test`)
- ✅ Does `allure-results/` folder exist?
- ✅ Is Allure reporter in playwright.config.ts?

### Report won't open automatically on Windows
**Solution** - Manual open:
```bash
npm run allure:generate
# Then open: allure-report/index.html in your browser
```

## Enhanced Test Examples

### Add Test Steps to Allure Report
```typescript
import { test, expect } from '@playwright/test';
import { DuoZakelijkPage } from '../src/pages/DuoZakelijkPage';

test('Navigation with Allure steps', async ({ page }) => {
  const duoPage = new DuoZakelijkPage(page);

  await test.step('Navigate to DUO Zakelijk', async () => {
    await duoPage.navigateToDuo();
  });

  await test.step('Click Kinderopvang link', async () => {
    await duoPage.clickNavigationLink('Kinderopvang');
  });

  await test.step('Verify heading is visible', async () => {
    await duoPage.verifyHeadingIsVisible('Kinderopvang');
  });
});
```

Each `test.step()` will appear as a separate step in the Allure report!

## Allure Report Benefits Over Playwright HTML

| Feature | Playwright | Allure |
|---------|-----------|--------|
| Test Results | ✅ | ✅ |
| Screenshots | ✅ | ✅ |
| Error Details | ✅ | ✅ |
| Trends/History | ❌ | ✅ |
| Flaky Detection | ❌ | ✅ |
| Test Steps | ❌ | ✅ (with `test.step()`) |
| Customizable | ❌ | ✅ |
| Rich Filtering | ❌ | ✅ |

## Next Steps

1. ✅ Run tests: `npm test`
2. ✅ Generate report: `npm run allure:report`
3. ✅ View report in browser (auto-opens)
4. ✅ Add test steps to enhance reporting
5. ✅ Integrate with CI/CD pipeline

## References

- 📖 [Allure Report Documentation](https://docs.qameta.io/allure/)
- 📖 [Allure Playwright GitHub](https://github.com/allure-framework/allure-js)
- 📖 [Playwright Test Docs](https://playwright.dev/)

---

**Setup:** ✅ Complete  
**Browsers:** Chrome, Microsoft Edge  
**Reports:** Playwright HTML + Allure  
**Created:** March 10, 2026
