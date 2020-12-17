export const cibTableFields = [
  {
    number: 'accountsTotalFb',
    followers: null,
    platformName: 'Facebook',
    fieldName: 'Accounts'
  },
  {
    number: 'pagesTotalFb',
    followers: 'pagesFollowersTotalFb',
    platformName: 'Facebook',
    fieldName: 'Pages'
  },
  {
    number: 'groupsTotalFb',
    followers: 'groupsFollowersTotalFb',
    platformName: 'Facebook',
    fieldName: 'Groups'
  },
  {
    number: 'eventsTotal',
    followers: null,
    platformName: 'Facebook',
    fieldName: 'Events'
  },
  {
    number: 'accountsTotalIg',
    followers: 'followersTotalIg',
    platformName: 'Instagram',
    fieldName: 'Accounts'
  }
].map((d, i) => ({id: i, ...d}));

export const cibColumnHeaders = [
  {
    name: '',
    type: 'platformName'
  },
  {
    name: '',
    type: 'fieldName'
  },
  {
    name: 'Entities',
    type: 'number'
  },
  {
    name: 'Followers',
    type: 'followers'
  }
].map((d, i) => ({id: i, ...d}));
