// This should match the model user template and be used for testing.

var testUser = {
  provider: 'local',
  email: 'test@test.com',
  password: 'test',
  builderComplete: true, // if the user has completed plan-builder or not.
  // Contains the user's personal inforamtion (and spouse if applicable).
  personal: {
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
      { name: 'Child 1 Name', birthdate: new Date(2013, 3, 17) },
      { name: 'Child 2 Name', birthdate: new Date(2015, 2, 14) }
    ],
  },
  // The plan property will contain the majority of the user's plan data.
  plan: {
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
    // contributions objects must be the name of the user's fixed or variable assets and stored as monthly contributions.
    contributions: {
      'User 401k': {
        amount: 1000,
        type: 'employer' // 'employer', 'individual', or 'non-retirement'
      },
      'User Roth IRA': {
        amount: 100,
        type: 'individual'
      },
      'Spouse 401k': {
        amount: 400,
        type: 'employer'
      },
      'Some Other Savings Account': {
        amount: 50,
        type: 'non-retirement'
      }
    },
    debts: {
      creditCards: [
        { name: 'VISA', rate: 10.99, amount: 5000 },
        { name: 'Chase Credit Card', rate: 15.99, amount: 4000 },
      ],
      other: [
        { name: 'Auto Loan', rate: 0.9, amount: 35000 },
        { name: 'Disney Wedding Loan', rate: 9.5, amount: 41000 }
      ],
      studentLoans: [
        { name: 'Federal Stafford', rate: 6.8, amount: 150000 },
        { name: 'Federal Perkins', rate: 5.0, amount: 50000 }
      ],
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
      payrollDeductions: 2000,
      shortCapitalGains: 0,
      spouseGrossAnnualW2: 100000,
      spouseGrossAnnual1099: 0,
      spousePayrollDeductions: 400,
    },
    retirement: {
      spouseTargetAge: 60,
      targetAge: 55,
      targetMonthlyIncome: 8000,
      pensionMonthlyIncome: 0,
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
    insurance: {
      auto: true,
      disability: 0,
      employerDisability: undefined,
      employerLife: 15000,
      health: true,
      home: true,
      life: 0,
      spouseHealth: true,
      spouseDisability: 0,
      spouseEmployerDisability: undefined,
      spouseEmployerLife: 50000,
      spouseLife: 10000,
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
