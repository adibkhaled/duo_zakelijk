/**
 * Page Locators for DUO Zakelijk Page (English)
 * URL: https://duo.nl/zakelijk/
 */

export const DUO_ZAKELIJK_LOCATORS = {
  // Navigation Links
  ZAKELIJK_LINK: { role: 'link', name: 'Zakelijk' },
  KINDEROPVANG_LINK: { role: 'link', name: 'Kinderopvang' },
  PRIMAIR_ONDERWIJS_LINK: { role: 'link', name: 'Primair onderwijs' },
  VOORTGEZET_ONDERWIJS_LINK: { role: 'link', name: 'Voortgezet onderwijs' },
  
  // Home/Navigation
  HOME_BUTTON: { title: 'Home', exact: true },
  
  // Search Elements
  SEARCH_INPUT: { role: 'textbox', name: 'Zoek' },
  SEARCH_BUTTON: { role: 'button', name: 'Zoek' },
  
  // Headers/Results
  KINDEROPVANG_HEADING: { role: 'heading', name: 'Kinderopvang' },
  PRIMAIR_ONDERWIJS_HEADING: { role: 'heading', name: 'Primair onderwijs' },
  VOORTGEZET_ONDERWIJS_HEADING: { role: 'heading', name: 'Voortgezet onderwijs' },
  
  // Search Results
  SEARCH_RESULT_LINK_KINDEROPVANG: { 
    role: 'link', 
    name: 'Personenregister Kinderopvang: Koppelen - DUO' 
  },
};
