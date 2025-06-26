import { generateData, EXAMPLE_FIELDS } from './index.mjs';

/**
 * Example 1: Basic transaction data
 */
const transactionFields = {
  id: 'id',
  transactionId: 'transactionId',
  terminalId: 'terminalId',
  merchantId: 'merchantId',
  amount: 'amount',
  status: 'status',
  type: 'type',
  card_pan: 'card_pan',
  rrn: 'rrn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

// Generate transaction data
const transactionData = generateData(50, transactionFields, {
  outputPath: './data/mock/generated/transactions.json',
  format: 'json',
  seed: 12345
});

/**
 * Example 2: Merchant data with complex fields
 */
const merchantFields = {
  id: 'id',
  name: 'companyName',
  email: 'email',
  phone: 'phone',
  address: 'address',
  city: 'city',
  country: 'country',
  zipCode: 'zipCode',
  status: { type: 'enum', options: ['active', 'inactive', 'suspended', 'pending'] },
  registrationDate: 'registrationDate',
  totalTransactions: { type: 'numberRange', min: 0, max: 10000 },
  averageAmount: { type: 'floatRange', min: 100, max: 50000, precision: 0.01 }
};

// Generate merchant data
const merchantData = generateData(25, merchantFields, {
  outputPath: './data/mock/generated/merchants.json',
  format: 'json',
  seed: 67890
});

/**
 * Example 3: Settlement data with financial fields
 */
const settlementFields = {
  id: 'id',
  settlementId: 'transactionId',
  merchantId: 'merchantId',
  totalValue: 'totalValue',
  settledValue: 'settledValue',
  totalVolume: 'totalVolume',
  charge: 'charge',
  settlementStatus: 'settlementStatus',
  settlementDate: 'date',
  createdAt: 'createdAt'
};

// Generate settlement data
const settlementData = generateData(30, settlementFields, {
  outputPath: './data/mock/generated/settlements.json',
  format: 'json',
  seed: 11111
});

/**
 * Example 4: User/Agent data
 */
const userFields = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  jobTitle: 'jobTitle',
  department: 'department',
  avatar: 'avatar',
  status: { type: 'enum', options: ['active', 'inactive', 'on_leave'] },
  hireDate: 'registrationDate',
  salary: { type: 'floatRange', min: 30000, max: 150000, precision: 0.01 }
};

// Generate user data
const userData = generateData(20, userFields, {
  outputPath: './data/mock/generated/users.json',
  format: 'json',
  seed: 22222
});

/**
 * Example 5: Product data
 */
const productFields = {
  id: 'id',
  name: 'productName',
  description: 'productDescription',
  price: 'price',
  category: { type: 'enum', options: ['electronics', 'clothing', 'books', 'home', 'sports'] },
  inStock: 'boolean',
  imageUrl: 'imageUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

// Generate product data
const productData = generateData(40, productFields, {
  outputPath: './data/mock/generated/products.json',
  format: 'json',
  seed: 33333
});

/**
 * Example 6: CSV format output
 */
const csvFields = {
  id: 'id',
  name: 'name',
  email: 'email',
  amount: 'amount',
  status: 'status',
  date: 'date'
};

// Generate CSV data
const csvData = generateData(15, csvFields, {
  outputPath: './data/mock/generated/data.csv',
  format: 'csv',
  seed: 44444
});

/**
 * Example 7: TypeScript format output
 */
const tsFields = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: { type: 'enum', options: ['draft', 'published', 'archived'] },
  createdAt: 'createdAt'
};

// Generate TypeScript data
const tsData = generateData(10, tsFields, {
  outputPath: './data/mock/generated/data.ts',
  format: 'ts',
  seed: 55555
});

/**
 * Example 8: JavaScript format output
 */
const jsFields = {
  id: 'id',
  name: 'name',
  value: 'number',
  isActive: 'boolean',
  tags: { type: 'enum', options: ['featured', 'new', 'popular', 'trending'] }
};

// Generate JavaScript data
const jsData = generateData(8, jsFields, {
  outputPath: './data/mock/generated/data.js',
  format: 'js',
  seed: 66666
});

/**
 * Example 9: Complex nested data structure
 */
const complexFields = {
  id: 'id',
  user: {
    name: 'name',
    email: 'email',
    avatar: 'avatar'
  },
  transaction: {
    amount: 'amount',
    type: 'type',
    status: 'status'
  },
  metadata: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tags: { type: 'enum', options: ['urgent', 'normal', 'low_priority'] }
  }
};

// Note: For complex nested structures, you might need to customize the generator
// This is a simplified example

/**
 * Example 10: Dispute data with nested status object
 */
const disputeFields = {
  id: 'id',
  product: 'product',
  transaction_reference: 'transactionId',
  reason: 'reason',
  merchantId: 'merchantId',
  amount: 'amount',
  status: {
    name: 'statusName',
    description: 'statusDescription',
    context: 'statusContext'
  }
};

// Generate dispute data
const disputeData = generateData(20, disputeFields, {
  outputPath: './data/mock/generated/disputes.json',
  format: 'json',
  seed: 88888
});

/**
 * Example 11: Support ticket with nested objects
 */
const ticketFields = {
  id: 'id',
  title: 'title',
  description: 'description',
  priority: 'priority',
  category: 'category',
  status: {
    name: 'statusName',
    description: 'statusDescription',
    context: 'statusContext'
  },
  assignedTo: 'assignedTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  metadata: 'metadata'
};

// Generate ticket data
const ticketData = generateData(15, ticketFields, {
  outputPath: './data/mock/generated/tickets.json',
  format: 'json',
  seed: 99999
});

/**
 * Example 12: Custom date range
 */
const dateRangeFields = {
  id: 'id',
  eventName: 'title',
  startDate: { type: 'dateRange', startDate: '2024-01-01', endDate: '2024-12-31' },
  endDate: { type: 'dateRange', startDate: '2024-01-01', endDate: '2024-12-31' },
  attendees: { type: 'numberRange', min: 10, max: 500 },
  budget: { type: 'floatRange', min: 1000, max: 100000, precision: 0.01 }
};

// Generate event data
const eventData = generateData(12, dateRangeFields, {
  outputPath: './data/mock/generated/events.json',
  format: 'json',
  seed: 77777
});

console.log('✅ All example data generated successfully!');
console.log('📁 Check the ./data/mock/generated/ directory for output files');

// Export all generated data for use in other modules
export {
  transactionData,
  merchantData,
  settlementData,
  userData,
  productData,
  csvData,
  tsData,
  jsData,
  eventData,
  disputeData,
  ticketData
}; 