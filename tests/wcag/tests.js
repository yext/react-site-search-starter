const universalSearchTests = [
  {
    name: 'universal-search'
  },
  {
    name: 'universal-search--spellcheck',
    commands: [{ type: 'search', params: ['cawfee', 'input'] }]
  }
];

const verticalSearchTests = [
  {
    name: 'vertical-search',
    commands: [{ type: 'click', params: ['a[href="/events"]'] }]
  },
  {
    name: 'vertical-search--no-results',
    commands: [
      { type: 'click', params: ['a[href="/jobs"]'] },
      { type: 'search', params: ['zelle', 'input'] }
    ]
  },
  {
    name: 'vertical-search--locations',
    commands: [{ type: 'click', params: ['a[href="/locations"]'] }]
  },
  {
    name: 'vertical-search--faqs',
    commands: [
      { type: 'click', params: ['a[href="/faqs"]'] }]
  }
];

const directAnswersTests = [
  {
    name: 'universal-search',
    commands: [{ type: 'search', params: ['where is joe exotic', 'input'] }]
  }
];

const tests = [
  ...universalSearchTests,
  ...verticalSearchTests, 
  ...directAnswersTests
]

module.exports = tests;
