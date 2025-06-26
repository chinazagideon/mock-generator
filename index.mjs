import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

/**
 * Mock Data Generator
 * Generates realistic mock data based on field definitions and types
 */

// Field type definitions with their corresponding faker methods
const FIELD_GENERATORS = {
  // Basic types
  string: () => faker.string.alphanumeric(10),
  number: () => faker.number.int({ min: 1, max: 10000 }),
  boolean: () => faker.datatype.boolean(),
  date: () => faker.date.recent().toISOString(),
  
  // Specific string types
  email: () => faker.internet.email(),
  phone: () => faker.phone.number(),
  name: () => faker.person.fullName(),
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  address: () => faker.location.streetAddress(),
  city: () => faker.location.city(),
  country: () => faker.location.country(),
  zipCode: () => faker.location.zipCode(),
  
  // Business specific
  terminalId: () => `T${faker.string.alphanumeric(8).toUpperCase()}`,
  merchantId: () => `M${faker.string.alphanumeric(8).toUpperCase()}`,
  card_pan: () => faker.finance.creditCardNumber(),
  rrn: () => faker.string.alphanumeric(12).toUpperCase(),
  transactionId: () => `TXN${faker.string.alphanumeric(10).toUpperCase()}`,
  product: () => faker.helpers.arrayElement(['commissionTransfer', 'commissionSettlement', 'commissionDispute']),
  
  // Financial
  amount: () => faker.number.float({ min: 100, max: 100000, precision: 0.01 }),
  totalValue: () => faker.number.float({ min: 1000, max: 1000000, precision: 0.01 }),
  settledValue: () => faker.number.float({ min: 500, max: 500000, precision: 0.01 }),
  totalVolume: () => faker.number.int({ min: 1, max: 1000 }),
  charge: () => faker.number.float({ min: 10, max: 5000, precision: 0.01 }),
  
  // Status types
  status: () => faker.helpers.arrayElement(['pending', 'completed', 'failed', 'processing']),
  settlementStatus: () => faker.helpers.arrayElement(['settled', 'pending', 'failed', 'processing']),
  type: () => faker.helpers.arrayElement(['credit', 'debit', 'transfer', 'withdrawal']),
  
  // Dates
  registrationDate: () => faker.date.past().toISOString(),
  createdAt: () => faker.date.past().toISOString(),
  updatedAt: () => faker.date.recent().toISOString(),
  
  // IDs
  id: () => faker.number.int({ min: 1, max: 999999 }),
  uuid: () => faker.string.uuid(),
  
  // URLs and images
  url: () => faker.internet.url(),
  imageUrl: () => faker.image.url(),
  avatar: () => faker.image.avatar(),
  
  // Text content
  description: () => faker.lorem.sentence(),
  title: () => faker.lorem.words(3),
  text: () => faker.lorem.paragraph(),
  reason: () => faker.lorem.sentence(),
  context: () => faker.helpers.arrayElement(['warning', 'error', 'info']),
  
  // Company related
  companyName: () => faker.company.name(),
  jobTitle: () => faker.person.jobTitle(),
  department: () => faker.commerce.department(),
  
  // Product related
  productName: () => faker.commerce.productName(),
  productDescription: () => faker.commerce.productDescription(),
  price: () => faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
  
  // Custom generators that accept parameters
  enum: (options) => faker.helpers.arrayElement(options),
  numberRange: (min, max) => faker.number.int({ min, max }),
  floatRange: (min, max, precision = 0.01) => faker.number.float({ min, max, precision }),
  dateRange: (startDate, endDate) => faker.date.between({ from: startDate, to: endDate }).toISOString(),
  stringLength: (length) => faker.string.alphanumeric(length),
  
  // Additional generators for nested objects
  statusName: () => faker.helpers.arrayElement(['pending', 'completed', 'failed', 'processing', 'cancelled']),
  statusDescription: () => faker.lorem.sentence(),
  statusContext: () => faker.helpers.arrayElement(['warning', 'error', 'info', 'success']),
  priority: () => faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
  category: () => faker.helpers.arrayElement(['technical', 'billing', 'support', 'general']),
  severity: () => faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
  resolution: () => faker.helpers.arrayElement(['resolved', 'unresolved', 'in_progress', 'escalated']),
  assignedTo: () => faker.person.fullName(),
  createdBy: () => faker.person.fullName(),
  updatedBy: () => faker.person.fullName(),
  notes: () => faker.lorem.paragraph(),
  tags: () => faker.helpers.arrayElements(['urgent', 'bug', 'feature', 'documentation', 'testing'], { min: 1, max: 3 }),
  metadata: () => ({
    source: faker.helpers.arrayElement(['web', 'mobile', 'api', 'system']),
    version: faker.system.semver(),
    environment: faker.helpers.arrayElement(['development', 'staging', 'production']),
    timestamp: faker.date.recent().toISOString()
  })
};

/**
 * Generate a single record based on field definitions
 * @param {Object} fields - Field definitions with types
 * @param {number} index - Current record index
 * @returns {Object} Generated record
 */
const generateRecord = (fields, index = 0) => {
  const record = {};
  
  for (const [fieldName, fieldType] of Object.entries(fields)) {
    let value;
    
    // Handle nested objects
    if (typeof fieldType === 'object' && fieldType !== null && !Array.isArray(fieldType) && !fieldType.type) {
      // This is a nested object, recursively generate its fields
      value = generateRecord(fieldType, index);
    } else if (typeof fieldType === 'string') {
      // Handle special cases
      if (fieldName === 'id' && fieldType === 'id') {
        value = index + 1; // Sequential IDs
      } else {
        // Simple type mapping
        const generator = FIELD_GENERATORS[fieldType];
        if (generator) {
          value = generator();
        } else {
          // Fallback to basic string
          value = faker.string.alphanumeric(10);
        }
      }
    } else if (typeof fieldType === 'object' && fieldType.type) {
      // Complex type with parameters
      const generator = FIELD_GENERATORS[fieldType.type];
      if (generator) {
        value = generator(fieldType.options || fieldType.min, fieldType.max, fieldType.precision);
      } else {
        value = faker.string.alphanumeric(10);
      }
    } else {
      // Fallback
      value = faker.string.alphanumeric(10);
    }
    
    record[fieldName] = value;
  }
  
  return record;
};

/**
 * Generate mock data
 * @param {number} count - Number of records to generate
 * @param {Object} fields - Field definitions with types
 * @param {Object} options - Additional options
 * @returns {Array} Generated data
 */
const generateData = (count, fields, options = {}) => {
  const {
    seed = null,
    format = 'json',
    outputPath = null,
    additionalData = {}
  } = options;
  
  // Set faker seed if provided
  if (seed !== null) {
    faker.seed(seed);
  }
  
  // Generate records
  const data = Array.from({ length: count }, (_, index) => ({
    ...generateRecord(fields, index),
    ...additionalData
  }));
  
  // Handle output format
  if (outputPath) {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    switch (format.toLowerCase()) {
      case 'json':
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        break;
      case 'csv':
        const csvContent = convertToCSV(data);
        fs.writeFileSync(outputPath, csvContent);
        break;
      case 'js':
        const jsContent = `export const mockData = ${JSON.stringify(data, null, 2)};`;
        fs.writeFileSync(outputPath, jsContent);
        break;
      case 'ts':
        const tsContent = `export const mockData = ${JSON.stringify(data, null, 2)} as const;`;
        fs.writeFileSync(outputPath, tsContent);
        break;
      default:
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    }
    
    console.log(`✅ Generated ${count} records and saved to ${outputPath}`);
  }
  
  return data;
};

/**
 * Convert data to CSV format
 * @param {Array} data - Data array
 * @returns {string} CSV content
 */
const convertToCSV = (data) => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
};

/**
 * Example field definitions
 */
const EXAMPLE_FIELDS = {
  // Basic fields
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  
  // Financial fields
  amount: 'amount',
  totalValue: 'totalValue',
  settledValue: 'settledValue',
  charge: 'charge',
  
  // Business fields
  terminalId: 'terminalId',
  merchantId: 'merchantId',
  card_pan: 'card_pan',
  rrn: 'rrn',
  
  // Status fields
  status: 'status',
  settlementStatus: 'settlementStatus',
  type: 'type',
  
  // Date fields
  registrationDate: 'registrationDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  
  // Complex fields with parameters
  customStatus: { type: 'enum', options: ['active', 'inactive', 'suspended'] },
  customAmount: { type: 'floatRange', min: 50, max: 5000, precision: 0.01 },
  customDate: { type: 'dateRange', startDate: '2023-01-01', endDate: '2024-12-31' }
};

// Export functions and examples
export {
  generateData,
  generateRecord,
  FIELD_GENERATORS,
  EXAMPLE_FIELDS,
  convertToCSV
};

// Example usage
if (import.meta.url === `file://${process.argv[1]}`) {
  // Generate sample data
  const sampleFields = {
    id: 'id',
    terminalId: 'terminalId',
    merchantId: 'merchantId',
    amount: 'amount',
    status: 'status',
    type: 'type',
    card_pan: 'card_pan',
    rrn: 'rrn',
    registrationDate: 'registrationDate'
  };
  
  const data = generateData(10, sampleFields, {
    outputPath: './sample-data.json',
    format: 'json',
    seed: 12345
  });
  
  console.log('Sample data generated:', data.length, 'records');
}