import ALLOWED_QUERY_PARAMS from '../validations/orders.validation.js';

export const validateQueryParams = (query = {}) => {
  const errors = [];

  for (const key of Object.keys(query)) {
    const rule = ALLOWED_QUERY_PARAMS[key];

    if (!rule) {
      errors.push(`Invalid query parameter: ${key}`);
      continue;
    }

    const value = query[key];

    switch (rule.type) {
      case 'number':
        if (isNaN(value)) {
          errors.push(`"${key}" must be a number`);
        }
        break;

      case 'date':
        if (isNaN(Date.parse(value))) {
          errors.push(`"${key}" must be a valid date`);
        }
        break;

      case 'enum':
        if (!rule.values.includes(value)) {
          errors.push(`"${key}" must be one of: ${rule.values.join(', ')}`);
        }
        break;

      case 'boolean':
        if (!['true', 'false', true, false].includes(value)) {
          errors.push(`"${key}" must be boolean`);
        }
        break;

      case 'string':
        if (typeof value !== 'string' || value.trim() === '') {
          errors.push(`"${key}" must be a non-empty string`);
        }
        break;
    }
  }

  if (query.limit && Number(query.limit) > 100) {
    errors.push(`"limit" cannot exceed 100`);
  }

  return errors;
};
