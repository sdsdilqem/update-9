import { randomUUID } from 'crypto';

export function generateId() {
  return randomUUID();
}

export function formatDate(date) {
  return date.toISOString();
}

export function parseDbRow(row) {
  return Object.entries(row).reduce((acc, [key, value]) => {
    // Convert snake_case to camelCase
    const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
    // Parse JSON strings
    if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
      try {
        acc[camelKey] = JSON.parse(value);
      } catch {
        acc[camelKey] = value;
      }
    } else {
      acc[camelKey] = value;
    }
    return acc;
  }, {});
}