# DUO Zakelijk - Geautomatiseerde Testen

Dit is een uitgebreide testsuite voor de DUO Zakelijk-website, gebouwd met Playwright en TypeScript.

## Overzicht

Dit project bevat geautomatiseerde tests voor de DUO Zakelijk-pagina (https://duo.nl/zakelijk/). De tests worden uitgevoerd met Playwright en gebruiken het Page Object Model (POM) patroon voor onderhoudbare en schaalbare tests.

## Projectstructuur

```
duo_zakelijk/
├── src/
│   ├── pages/
│   │   └── DuoZakelijkPage.ts          # Page Object voor DUO Zakelijk
│   └── resource/
│       ├── locator/
│       │   └── duoZakelijkLocators.nl.ts  # Locators in Nederlands
│       └── data/
│           └── duoZakelijkTestData.ts  # Testgegevens
├── tests/
│   ├── duo_zakelijk_comprehensive.spec.ts  # Uitgebreide tests
│   ├── duo_zakelijk_navigation.spec.ts     # Navigatietests
│   └── duo_zakelijk_search.spec.ts         # Zoektests
├── allure-report/               # Allure rapportage
├── playwright.config.ts         # Playwright configuratie
├── package.json                 # Dependencies
└── README.nl.md                # Dit bestand
```

## Testsuites

### 1. Uitgebreide Tests (`duo_zakelijk_comprehensive.spec.ts`)

Volledige tests voor alle functionaliteiten van de DUO Zakelijk-pagina:

- **Testsuite 1: Pagina laden en beginwaarde**
  - TC-INITIAL-001: Pagina laadt succesvol
  - TC-INITIAL-002: Zoekinvoerveld is zichtbaar bij laden
  - TC-INITIAL-003: Pagina-URL is correct

- **Testsuite 2: Navigatie - Kinderopvang**
  - TC-KINDEROPVANG-001: Klik op Kinderopvang-link en controleer koptekst
  - TC-KINDEROPVANG-002: Terugkeer naar startpagina

- **Testsuite 3: Navigatie - Primair onderwijs**
  - TC-PRIMAIR-001: Klik op Primair onderwijs-link en controleer koptekst
  - TC-PRIMAIR-002: Terugkeer naar startpagina

- **Testsuite 4: Navigatie - Voortgezet onderwijs**
  - TC-VOORTGEZET-001: Klik op Voortgezet onderwijs-link en controleer koptekst
  - TC-VOORTGEZET-002: Terugkeer naar startpagina

- **Testsuite 5: Zoekfunctionaliteit**
  - TC-SEARCH-BASIC-001: Zoekinvoerveld is zichtbaar
  - TC-SEARCH-BASIC-002: Zoek naar kinderopvang en controleer resultaten
  - TC-SEARCH-BASIC-003: Zoekresultaten bevatten verwachte inhoud
  - TC-SEARCH-BASIC-004: Terugkeer naar startpagina vanuit zoekresultaten

- **Testsuite 6: Complete gebruikerstraject**
  - TC-JOURNEY-001: Complete gebruikerstraject met navigatie en zoeken
  - TC-JOURNEY-002: Navigatiestroom door alle secties

- **Testsuite 7: Linkverificatie**
  - TC-LINKS-001 t/m TC-LINKS-005: Controleer zichtbaarheid en bestaan van links

### 2. Navigatietests (`duo_zakelijk_navigation.spec.ts`)

Tests specifiek gericht op navigatiefunctionaliteit:

- TC-NAV-001: Controleer of alle navigatielinks zichtbaar zijn
- TC-NAV-002: Zakelijk-link is klikbaar
- TC-NAV-003 t/m TC-NAV-006: Gegevengestuurde tests voor elke navigatiesectie
- TC-NAV-007: Navigatiestroom door meerdere secties
- TC-NAV-008: Paginatitel bevat verwachte tekst
- TC-NAV-009: Startknop functionaliteit
- TC-NAV-010: Links zijn toegankelijk

### 3. Zoektests (`duo_zakelijk_search.spec.ts`)

Tests voor de zoekfunctionaliteit:

- TC-SEARCH-001: Zoekinvoerveld is zichtbaar
- TC-SEARCH-002 t/m TC-SEARCH-003: Gegevengestuurde zoektests
- TC-SEARCH-004: Zoek met speciale zoekterm
- TC-SEARCH-005: Zoek met minimale term
- TC-SEARCH-006: Zoekresultaatlinks zijn zichtbaar
- TC-SEARCH-007: Meervoudige zoekopdrachten achtereenvolgens
- TC-SEARCH-008: Zoeken en terugkeer naar startpagina
- TC-SEARCH-009: Zoekinvoerveld gedrag
- TC-SEARCH-010: Zoekknop is zichtbaar en toegankelijk

## Installation

### Vereisten

- Node.js (v16 of hoger)
- npm of yarn

### Setupstappen

1. **Clone de repository**
   ```bash
   git clone <repository-url>
   cd duo_zakelijk
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Installeer Playwright browsers**
   ```bash
   npx playwright install
   ```

## Tests Uitvoeren

### Alle tests uitvoeren
```bash
npm test
```

### Specifieke test uitvoeren
```bash
npx playwright test duo_zakelijk_comprehensive.spec.ts
```

### Tests met specifieke tag uitvoeren
```bash
npx playwright test -g "TC-KINDEROPVANG"
```

### Tests in UI mode uitvoeren (interactief)
```bash
npx playwright test --ui
```

### Tests in debug mode uitvoeren
```bash
npx playwright test --debug
```

### Headed mode (browser zichtbaar)
```bash
npx playwright test --headed
```

## Configuratie

### Playwright Configuratie (`playwright.config.ts`)

De Playwright configuratie bevat:
- **Base URL**: https://duo.nl/zakelijk/
- **Timeout**: 30 seconden
- **Browsertypen**: Chromium, Firefox, WebKit
- **Headless mode**: Standaard aan
- **Screenshot on failure**: Aan
- **Video on failure**: Aan
- **Retry on failure**: 2x

### Environment Variabelen

Geen vereiste environment variabelen, maar u kunt het volgende instellen:

```bash
# Base URL aanpassen
export BASE_URL=https://duo.nl/zakelijk/

# Headless mode uitschakelen
export HEADED=true

# Langzamere uitvoering voor debugging
export SLOW_MO=1000
```

## Page Object Model (POM)

### DuoZakelijkPage Klasse

De `DuoZakelijkPage` klasse encapsuleert alle interacties met de DUO Zakelijk-pagina:

```typescript
// Navigatie
await duoZakelijkPage.navigateToDuo();
await duoZakelijkPage.clickNavigationLink('Kinderopvang');
await duoZakelijkPage.clickHomeButton();

// Verificatie
await duoZakelijkPage.verifyPageIsLoaded();
await duoZakelijkPage.verifyLinkIsVisible('Zakelijk');
await duoZakelijkPage.verifyHeadingIsVisible('Kinderopvang');

// Zoeken
await duoZakelijkPage.performSearch('kinderopvang');
await duoZakelijkPage.verifySearchInputIsVisible();
await duoZakelijkPage.verifySearchResultContains('Kinderopvang');

// Hulpmethoden
const links = await duoZakelijkPage.getAllLinks();
const url = await duoZakelijkPage.getCurrentUrl();
const title = await duoZakelijkPage.getPageTitle();
```

## Testgegevens

Testgegevens zijn opgeslagen in `src/resource/data/duoZakelijkTestData.ts`:

### Navigatielinks
- Zakelijk
- Kinderopvang
- Primair onderwijs
- Voortgezet onderwijs

### Zoekopdrachten
- kinderopvang (verwacht: Kinderopvang)
- onderwijs (verwacht: onderwijs)
- duo (verwacht: DUO)

## Lokators

Lokators zijn gecentreerd in `src/resource/locator/duoZakelijkLocators.nl.ts`:

```typescript
// Voorbeeld lokator structuur
{
  name: 'Kinderopvang',
  selector: 'a[href="..."]', // of ander selector
  // ...
}
```

## Rapportage

### Allure Rapportage

Tests genereren Allure rapportresultaten in de `allure-results/` directory.

**Allure rapport genereren:**
```bash
npx allure generate --clean -o allure-report
npx allure open allure-report
```

**Huidige rapport bekijken:**
```bash
allure open allure-report
```

### Playwright Rapportage

```bash
npx playwright show-report
```

## Troubleshooting

### Tests falen vanwege timeout
Verhoog de timeout in `playwright.config.ts`:
```typescript
timeout: 60000 // 60 seconden
```

### Browser-instanties falen
Zorg ervoor dat Playwright browsers zijn geïnstalleerd:
```bash
npx playwright install
```

### Tests falen vanwege network
Zorg ervoor dat u internetverbinding hebt en de DUO-website beschikbaar is.

## Best Practices

1. **Use Data-Driven Tests**: Herbruik testlogica met verschillende datasets
2. **Page Object Model**: Alle interacties met de pagina gaan door de POM-klasse
3. **Descriptive Test Names**: Testnamen moeten duidelijk maken wat wordt getest
4. **Wait for Elements**: Wacht tot elementen zichtbaar zijn voordat u ermee werkt
5. **Clean Up**: Zorg ervoor dat tests onafhankelijk zijn en geen staat delen

## CI/CD Integratie

Dit project kan eenvoudig worden geïntegreerd in CI/CD pipelines:

### GitHub Actions Voorbeeld
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
```

## Contributing

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit uw changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## Licentie

Dit project is gelicentieerd onder de MIT Licentie - zie het LICENSE-bestand voor details.

## Contact

Voor vragen of ondersteuning, neem contact op met het testteam.

---

**Laatst geüpdatet**: March 2026
**Versie**: 1.0
