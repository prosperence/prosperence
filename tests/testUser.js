// This should match the model user template and be used for testing.

var testUser = {
  provider: 'local',
  email: 'test@test.com',
  name: 'Test User',
  password: 'test',
  builderProgress: {
    // Object to track which sections of plan-builder the user has completed.
    start: true,
    basics: true,
    assets: true,
    debts: true,
    spending: true,
    savings: true,
    insurances: true,
    tax: true,
    goals: true
  },
  forum: {
    starred: {},
    comments: {}
  },
  personal: {
    // Contains the user's personal inforamtion (and spouse if applicable).
    firstName: 'Test',
    lastName: 'User',
    birthdate: new Date(1986, 5, 9),
    residentAddress: {
      street: '123 Something St.',
      city: 'San Francisco',
      state: 'CA'
    },
    workAddress: {
      street: '456 Something St.',
      city: 'San Francisco',
      state: 'CA'
    },
    married: true,
    differentWorkResidence: false,
    spouseFirstName: 'Spouse',
    spouseLastName: 'User',
    spouseBirthdate: new Date(1989, 8, 6),
    spouseResidentAddress: {
      street: '123 Something St.',
      city: 'San Francisco',
      state: 'CA'
    },
    spouseWorkAddress: {
      street: '123 Something St.',
      city: 'San Francisco',
      state: 'CA'
    },
    hasChildren: true,
    children: [
      { name: 'Child 1 Name', birthdate: new Date(2013, 2, 17) },
      { name: 'Child 2 Name', birthdate: new Date(2015, 3, 14) }
    ],
  },
  plan: {
    // The plan property will contain the majority of the user's plan data.
    assets: {
      fixed: [
        { name: 'Primary Checking/Savings Account', amount: 5000, emergencyReserve: false },
        { name: 'Some Other Savings Account', amount: 10000, emergencyReserve: true }
      ],
      personal: [
        { name: 'Home', amount: 500000, primaryResidence: true },
        { name: 'Auto', amount: 40000 },
        { name: 'Other Stuff', amount: 10000 }
      ],
      variable: [
        { name: 'Brokerage Account', amount: 25000, tax: 'capitalGains' },
        { name: 'User 401k', amount: 13000, tax: 'pretax' },
        { name: 'User Roth IRA', amount: 9500, tax: 'posttax' },
        { name: 'Spouse 401k', amount: 5000, tax: 'pretax' },
        { name: 'Spouse Rollover IRA', amount: 17000, tax: 'pretax' }
      ],
    },
    contributions: {
      reserves: [{
        name: 'Some Other Savings Account',
        amount: 50,
        frequency: 'Weekly', // 'Weekly', 'Monthly', 'Semi-Annually', 'Annually'
        type: 'non-retirement'
      }],
      earlyRetirement: [{
        name: 'Brokerage Account',
        amount: 250,
        frequency: 'Weekly',
        type: 'non-retirement'
      }],
      retirement: [{
        name: 'User 401k', // contributions objects must be the name of the user's fixed or variable assets.
        amount: 1000,
        frequency: 'Monthly',
        type: 'employer' // 'employer', 'individual', 'non-retirement'
      }, {
        name: 'User Roth IRA',
        amount: 100,
        frequency: 'Weekly',
        type: 'individual'
      }, {
        name: 'Spouse 401k',
        amount: 400,
        frequency: 'Monthly',
        type: 'employer'
      }]
    },
    debts: {
      creditCards: [
        { name: 'VISA', rate: 10.99, amount: 5000 },
        { name: 'Chase Credit Card', rate: 15.99, amount: 4000 }
      ],
      other: [
        { name: 'Auto Loan', rate: 0.9, amount: 35000 },
        { name: 'Speedboat Loan', rate: 9.5, amount: 41000 }
      ],
      studentLoans: [
        { name: 'Federal Stafford', rate: 6.8, amount: 150000 },
        { name: 'Federal Perkins', rate: 5.0, amount: 50000 }
      ],
    },
    // TODO: Add debt reduction projection logic to server process.
    debtProjection: {
      debts: [ // Debts in order of repayment priority.
        { name: 'VISA', rate: 10.99, amount: 5000, minPay: 50 },
        { name: 'Chase Credit Card', rate: 15.99, amount: 4000, minPay: 100 },
        { name: 'Auto Loan', rate: 0.9, amount: 35000, minPay: 75 },
        { name: 'Speedboat Loan', rate: 9.5, amount: 41000, minPay: 150 },
        { name: 'Federal Stafford', rate: 6.8, amount: 150000, minPay: 100 },
        { name: 'Federal Perkins', rate: 5.0, amount: 50000, minPay: 150 }
      ],
      schedule: {}
    },
    expenses: {
      fixed: [
        { name: 'Mortgage', amount: 1960 },
        { name: 'Utilities', amount: 450 },
        { name: 'Auto Loan', amount: 500 },
        { name: 'Student Loans', amount: 1200 },
        { name: 'Insurances', amount: 700 },
        { name: 'Groceries', amount: 1000 },
        { name: 'Childcare', amount: 800 }
      ],
      flexible: [
        { name: 'Entertainment', amount: 800 },
        { name: 'Travel / Vacations', amount: 1000 },
        { name: 'Miscellaneous', amount: 500 }
      ]
    },
    hasMortgage: true,
    hasPrimaryResidence: true,
    income: {
      grossAnnualW2: 250000,
      grossAnnual1099: 0,
      longCapitalGains: 0,
      userPayrollDeductions: 2000,
      spousePayrollDeductions: 500,
      shortCapitalGains: 0,
      spouseGrossAnnualW2: 100000,
      spouseGrossAnnual1099: 0,
      spousePayrollDeductions: 400
    },
    insurances: {
      userHealth: true,
      spouseHealth: true,
      userHome: true,
      userAuto: true,
      userEmployerLife: 10000,
      userIndividualLife: 50000,
      spouseEmployerLife: 10000,
      spouseIndividualLife: 100000,
      userEmployerDisability: 2500,
      userIndividualDisability: 5000,
      spouseEmployerDisability: 0,
      spouseIndividualDisability: undefined
    },
    mortgage: {
      homeValue: 500000,
      currentBalance: 300000,
      currentRate: 3.9,
      currentTerm: 30,
      initialBalance: 400000,
      startDate: new Date(2006, 5, 1),
    },
    netWorth: 57000, // Sum of all assets - all liabilities.
    retirement: {
      spouseTargetAge: 60,
      targetAge: 55,
      targetMonthlyIncome: 8000,
      pensionMonthlyIncome: 0,
    },
    retirementProjection: {
      // TODO: Fill in test retirement projection data.
    },
    tax: {
      charitableContributions: 10000,
      dependents: 2,
      filingStatus: 'married',
      otherDeductions: 5000
    },
    taxProjection: {
      householdGross: 350000,
      pretaxContributions: 34000,
      agi: 316000,
      deductions: {
        standard: 12600,
        itemized: {
          localTaxes: 38930,
          propertyTaxes: 3050,
          mortgageInterest: 10280,
          miscDeduction: 5000
        },
        maxApplicable: 52061
      },
      exemptions: {
        claimed: 8000,
        reductions: 720,
        maxApplicable: 7280
      },
      taxableIncome: 256659,
      projected: {
        federal: 60391,
        amt: 13339,
        local: 38930,
        fica: {
          ss: 13547,
          medicare: 5075,
          addlMedicare: 900
        }
      },
      netIncome: 143999
    }
  }
};

module.exports = testUser;
