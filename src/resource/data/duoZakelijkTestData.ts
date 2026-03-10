/**
 * Test Data for DUO Zakelijk Page
 * Navigation Links to test
 */

export const NAVIGATION_LINKS_DATA = [
  {
    id: 1,
    name: 'Zakelijk',
    linkName: 'Zakelijk',
    expectedVisible: 'Zakelijk',
    description: 'Navigate to Zakelijk section'
  },
  {
    id: 2,
    name: 'Kinderopvang',
    linkName: 'Kinderopvang',
    expectedHeading: 'Kinderopvang',
    description: 'Navigate to Kinderopvang section'
  },
  {
    id: 3,
    name: 'Primair onderwijs',
    linkName: 'Primair onderwijs',
    expectedHeading: 'Primair onderwijs',
    description: 'Navigate to Primair onderwijs section'
  },
  {
    id: 4,
    name: 'Voortgezet onderwijs',
    linkName: 'Voortgezet onderwijs',
    expectedHeading: 'Voortgezet onderwijs',
    description: 'Navigate to Voortgezet onderwijs section'
  }
];

/**
 * Test Data for Search Functionality
 */
export const SEARCH_DATA = [
  {
    id: 1,
    searchTerm: 'kinderopvang',
    expectedResultPartial: 'Kinderopvang',
    description: 'Search for Kinderopvang'
  },
  {
    id: 2,
    searchTerm: 'onderwijs',
    expectedResultPartial: 'onderwijs',
    description: 'Search for onderwijs'
  },
  {
    id: 3,
    searchTerm: 'duo',
    expectedResultPartial: 'DUO',
    description: 'Search for DUO'
  }
];

/**
 * External Links to verify on page
 */
export const EXTERNAL_LINKS_DATA = [
  {
    id: 1,
    description: 'Zakelijk link should be visible'
  },
  {
    id: 2,
    description: 'Kinderopvang link should be visible'
  },
  {
    id: 3,
    description: 'Primair onderwijs link should be visible'
  },
  {
    id: 4,
    description: 'Voortgezet onderwijs link should be visible'
  }
];
