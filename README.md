# Mock Data Generator

A comprehensive mock data generator that creates realistic test data based on field definitions and types. Supports multiple output formats including JSON, CSV, JavaScript, and TypeScript.

## Features

- 🎯 **Type-based generation**: Define field types and get realistic data
- 📊 **Multiple output formats**: JSON, CSV, JS, TS
- 🔧 **Customizable**: Support for custom field types and parameters
- 🌱 **Seeded generation**: Reproducible data with seed values
- 💼 **Business-specific**: Pre-built generators for common business data
- 📁 **Auto-save**: Automatically save to files with directory creation

## Quick Start

### Basic Usage

```javascript
import { generateData } from './index.mjs';

const fields = {
  id: 'id',
  name: 'name',
  email: 'email',
  amount: 'amount',
  status: 'status'
};

const data = generateData(10, fields, {
  outputPath: './output.json',
  format: 'json',
  seed: 12345
});
```

### Field Types

#### Basic Types
- `'string'` - Random alphanumeric string
- `'number'` - Random integer (1-10000)
- `'boolean'` - Random boolean value
- `'date'` - Recent date in ISO format

#### Business-Specific Types
- `'terminalId'` - Terminal ID (T + 8 chars)
- `'merchantId'` - Merchant ID (M + 8 chars)
- `'card_pan'` - Credit card number
- `'rrn'` - Retrieval Reference Number
- `'transactionId'` - Transaction ID (TXN + 10 chars)

#### Financial Types
- `'amount'` - Float amount (100-100000)
- `'totalValue'` - Large float value (1000-1000000)
- `'settledValue'` - Settlement amount (500-500000)
- `'charge'` - Fee amount (10-5000)

#### Status Types
- `'status'` - Transaction status (pending, completed, failed, processing)
- `'settlementStatus'` - Settlement status (settled, pending, failed, processing)
- `'type'` - Transaction type (credit, debit, transfer, withdrawal)

#### Personal Information
- `'name'` - Full name
- `'firstName'` - First name
- `'lastName'` - Last name
- `'email'` - Email address
- `'phone'` - Phone number
- `'address'` - Street address
- `'city'` - City name
- `'country'` - Country name
- `'zipCode'` - ZIP/Postal code

#### Company Information
- `'companyName'` - Company name
- `'jobTitle'` - Job title
- `'department'` - Department name

#### Product Information
- `'productName'` - Product name
- `'productDescription'` - Product description
- `'price'` - Product price (10-1000)

#### Media & URLs
- `'url'` - Website URL
- `'imageUrl'` - Image URL
- `'avatar'` - Avatar image URL

#### Text Content
- `'description'` - Sentence description
- `'title'` - Short title (3 words)
- `'text'` - Paragraph text

#### IDs and References
- `'id'` - Sequential integer ID
- `'uuid'` - UUID string

### Complex Field Types

#### Enum with Options
```javascript
{
  status: { type: 'enum', options: ['active', 'inactive', 'suspended'] }
}
```

#### Number Range
```javascript
{
  quantity: { type: 'numberRange', min: 1, max: 100 }
}
```

#### Float Range with Precision
```javascript
{
  price: { type: 'floatRange', min: 10.50, max: 999.99, precision: 0.01 }
}
```

#### Date Range
```javascript
{
  eventDate: { type: 'dateRange', startDate: '2024-01-01', endDate: '2024-12-31' }
}
```

#### String with Length
```javascript
{
  code: { type: 'stringLength', length: 8 }
}
```

#### Nested Objects
```javascript
{
  status: {
    name: 'statusName',
    description: 'statusDescription',
    context: 'statusContext'
  }
}
```

This will generate:
```json
{
  "status": {
    "name": "processing",
    "description": "Transaction is being processed",
    "context": "warning"
  }
}
```

## API Reference

### `generateData(count, fields, options)`

Generates mock data based on field definitions.

#### Parameters

- `count` (number): Number of records to generate
- `fields` (object): Field definitions with types
- `options` (object): Optional configuration

#### Options

- `seed` (number): Seed for reproducible generation
- `format` (string): Output format ('json', 'csv', 'js', 'ts')
- `outputPath` (string): File path to save output
- `additionalData` (object): Additional data to merge with each record

#### Returns

Array of generated records

### `generateRecord(fields, index)`

Generates a single record.

#### Parameters

- `fields` (object): Field definitions
- `index` (number): Record index (for sequential IDs)

#### Returns

Single generated record object

## Examples

### Transaction Data
```javascript
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
  createdAt: 'createdAt'
};

const data = generateData(50, transactionFields, {
  outputPath: './transactions.json',
  format: 'json',
  seed: 12345
});
```

### Merchant Data with Complex Fields
```javascript
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

const data = generateData(25, merchantFields, {
  outputPath: './merchants.json',
  format: 'json',
  seed: 67890
});
```

### CSV Output
```javascript
const csvFields = {
  id: 'id',
  name: 'name',
  email: 'email',
  amount: 'amount',
  status: 'status',
  date: 'date'
};

const data = generateData(15, csvFields, {
  outputPath: './data.csv',
  format: 'csv',
  seed: 44444
});
```

### TypeScript Output
```javascript
const tsFields = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: { type: 'enum', options: ['draft', 'published', 'archived'] },
  createdAt: 'createdAt'
};

const data = generateData(10, tsFields, {
  outputPath: './data.ts',
  format: 'ts',
  seed: 55555
});
```

### Nested Objects
```javascript
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

const data = generateData(20, disputeFields, {
  outputPath: './disputes.json',
  format: 'json',
  seed: 88888
});
```

This generates data like:
```json
{
  "id": 1,
  "product": "commissionDispute",
  "transaction_reference": "TXNJBCZAXEKEK",
  "reason": "Transaction dispute raised by merchant",
  "merchantId": "MSKRJZFNA",
  "amount": 2782.24,
  "status": {
    "name": "processing",
    "description": "Dispute is being reviewed",
    "context": "warning"
  }
}
```

## Output Formats

### JSON
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "amount": 1250.50,
    "status": "completed"
  }
]
```

### CSV
```csv
id,name,email,amount,status
1,John Doe,john.doe@example.com,1250.50,completed
2,Jane Smith,jane.smith@example.com,890.25,pending
```

### JavaScript
```javascript
export const mockData = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "amount": 1250.50,
    "status": "completed"
  }
];
```

### TypeScript
```typescript
export const mockData = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "amount": 1250.50,
    "status": "completed"
  }
] as const;
```

## Running Examples

To run the example file:

```bash
node data/mock/examples.mjs
```

This will generate multiple sample files in the `data/mock/generated/` directory.

## Custom Field Generators

You can extend the `FIELD_GENERATORS` object to add custom field types:

```javascript
const FIELD_GENERATORS = {
  // ... existing generators
  
  // Custom generator
  customField: () => 'custom value',
  
  // Generator with parameters
  customRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
};
```

## Best Practices

1. **Use seeds** for reproducible data during development
2. **Define field types** that match your actual data structure
3. **Use business-specific types** when available for more realistic data
4. **Test with small counts** first before generating large datasets
5. **Validate generated data** to ensure it meets your requirements

## Dependencies

- `@faker-js/faker`: For generating realistic fake data
- `fs`: For file system operations
- `path`: For path manipulation

## License

This mock data generator is part of the webadmin-frontend project. 