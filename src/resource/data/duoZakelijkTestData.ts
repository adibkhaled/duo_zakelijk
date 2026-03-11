/**
 * Testgegevens voor DUO Zakelijk Pagina
 * Navigatielinks om te testen
 */

export const NAVIGATION_LINKS_DATA = [
  {
    id: 1,
    name: 'Zakelijk',
    linkName: 'Zakelijk',
    expectedVisible: 'Zakelijk',
    description: 'Navigeer naar Zakelijk-sectie'
  },
  {
    id: 2,
    name: 'Kinderopvang',
    linkName: 'Kinderopvang',
    expectedHeading: 'Kinderopvang',
    description: 'Navigeer naar Kinderopvang-sectie'
  },
  {
    id: 3,
    name: 'Primair onderwijs',
    linkName: 'Primair onderwijs',
    expectedHeading: 'Primair onderwijs',
    description: 'Navigeer naar Primair onderwijs-sectie'
  },
  {
    id: 4,
    name: 'Voortgezet onderwijs',
    linkName: 'Voortgezet onderwijs',
    expectedHeading: 'Voortgezet onderwijs',
    description: 'Navigeer naar Voortgezet onderwijs-sectie'
  }
];

/**
 * Testgegevens voor Zoekfunctionaliteit
 */
export const SEARCH_DATA = [
  {
    id: 1,
    searchTerm: 'kinderopvang',
    expectedResultPartial: 'Kinderopvang',
    description: 'Zoek naar Kinderopvang'
  },
  {
    id: 2,
    searchTerm: 'onderwijs',
    expectedResultPartial: 'onderwijs',
    description: 'Zoek naar onderwijs'
  },
  {
    id: 3,
    searchTerm: 'duo',
    expectedResultPartial: 'DUO',
    description: 'Zoek naar DUO'
  }
];

/**
 * Externe links om op pagina te verifiëren
 */
export const EXTERNAL_LINKS_DATA = [
  {
    id: 1,
    description: 'Zakelijk-link moet zichtbaar zijn'
  },
  {
    id: 2,
    description: 'Kinderopvang-link moet zichtbaar zijn'
  },
  {
    id: 3,
    description: 'Primair onderwijs-link moet zichtbaar zijn'
  },
  {
    id: 4,
    description: 'Voortgezet onderwijs-link moet zichtbaar zijn'
  }
];
