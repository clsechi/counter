import { openDB } from 'idb';

/**
 * If indexedDB is available, create a connection with database
 * and create the object store if needed
 *
 * @returns {promise} A database connection
 */
export const dbPromise = () => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB');
  }
  return openDB('counterDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('records')) {
        db.createObjectStore('records', {
          keyPath: 'createdAt',
        });
      }
    },
  });
};

/**
 * Check if the used type is valid
 *
 * @param {string} type A record type
 */
const validType = (type) => {
  const validTypes = ['increase', 'decrease', 'reset'];

  if (type && validTypes.includes(type)) {
    return type;
  }
  throw new Error(`Invalid "type" received (${type})`);
};

/**
 * Check if the used value is valid
 *
 * @param {number} value A record value
 */
const validValue = (value) => {
  if (Number.isInteger(value)) {
    return value;
  }
  throw new Error(`Invalid "value" received ${value}`);
};

/**
 * Validade passed values and create a record object
 *
 * @param {string} type The record type
 * @param {number} value The record value
 * @returns {object} A record object
 */
const recordFactory = (type, value) => ({
  type: validType(type),
  value: validValue(value),
  createdAt: Date.now(),
});

/**
 * Create a new record in DB if the params are valid
 *
 * @param {string} type The record type
 * @param {number} value The record value
 */
export const addRaw = async (type, value) => {
  const db = await dbPromise();
  const record = recordFactory(type, value);
  return db.add('records', record);
};

/**
 * Get all records from DB
 * @returns {object[]} An array of records
 */
export const getAll = async () => {
  const db = await dbPromise();
  return db.getAll('records');
};
