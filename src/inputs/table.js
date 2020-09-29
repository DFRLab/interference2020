import { timeFormat, format } from 'd3';

const commaFormat = format(',');

export const columns = [
  {
    property: 'source',
    name: 'Source',
    sortable: true,
    classes: 'left',
    minWidth: '100px',
    format: (d) => d.join(', ')
  },
  {
    property: 'sourceNation',
    name: 'Source Nation',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'sourceCategory',
    name: 'Source Category',
    sortable: true,
    classes: 'left',
    minWidth: '100px',
    format: (d) => d.join(', ')
  },
  {
    property: 'disinformant',
    name: 'Disinformant',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'disinformantNation',
    name: 'Disinformant Nation',
    sortable: true,
    classes: 'left',
    minWidth: '100px',
    format: (d) => d.join(', ')
  },
  {
    property: 'disinformantAttribution',
    name: 'Disinformant Attribution',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'shortTitle',
    name: 'Title',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'shortDescription',
    name: 'Description',
    sortable: true,
    classes: 'left',
    minWidth: '500px'
  },
  {
    property: 'attributionUrl',
    name: 'Link',
    sortable: true,
    classes: 'left',
    hyperlink: true,
    minWidth: '100px'
  },
  {
    property: 'openWeb',
    name: 'Open Web',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'socialMedia',
    name: 'Social Media',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'messagingPlatforms',
    name: 'Messaging Platforms',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'other',
    name: 'Other',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'startDate',
    name: 'Start Date',
    sortable: true,
    format: timeFormat('%B %d, %Y'),
    classes: 'left',
    minWidth: '200px'
  },
  {
    property: 'endDate',
    name: 'End Date',
    sortable: true,
    format: timeFormat('%B %d, %Y'),
    classes: 'left',
    minWidth: '200px'
  },
  {
    property: 'attributionDate',
    name: 'Attribution Date',
    sortable: true,
    format: timeFormat('%B %d, %Y'),
    classes: 'left',
    minWidth: '200px'
  },
  {
    property: 'methods',
    name: 'Methods',
    sortable: true,
    classes: 'left',
    format: (d) => d.join(', '),
    minWidth: '100px'
  },
  {
    property: 'smiFacebook',
    name: 'Facebook Engagement',
    sortable: true,
    classes: 'right',
    minWidth: '100px',
    format: (d) => commaFormat(d)
  },
  {
    property: 'smiTwitter',
    name: 'Twitter Engagement',
    sortable: true,
    classes: 'right',
    minWidth: '100px',
    format: (d) => commaFormat(d)
  },
  {
    property: 'smiReddit',
    name: 'Reddit Engagement',
    sortable: true,
    classes: 'right',
    minWidth: '100px',
    format: (d) => commaFormat(d)
  },
  {
    property: 'smiTotal',
    name: 'Total Engagement',
    sortable: true,
    classes: 'right',
    minWidth: '100px',
    format: (d) => commaFormat(d)
  },
  {
    property: 'attributionCredibilityScore',
    name: 'Credibility Score',
    sortable: true,
    classes: 'right',
    minWidth: '100px'
  },
  {
    property: 'attributionObjectivityScore',
    name: 'Objectivity Score',
    sortable: true,
    classes: 'right',
    minWidth: '100px'
  },
  {
    property: 'attributionEvidenceScore',
    name: 'Evidence Score',
    sortable: true,
    classes: 'right',
    minWidth: '100px'
  },
  {
    property: 'attributionTransparencyScore',
    name: 'Transparency Score',
    sortable: true,
    classes: 'right',
    minWidth: '100px'
  },
  {
    property: 'attributionScore',
    name: 'Attribution Score',
    sortable: true,
    classes: 'right',
    minWidth: '100px'
  }
];
