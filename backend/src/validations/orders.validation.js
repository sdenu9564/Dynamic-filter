const ALLOWED_QUERY_PARAMS = {
  order_status: {
    type: 'enum',
    values: ['placed', 'shipped', 'delivered', 'cancelled']
  },
  start_date: { type: 'date' },
  end_date: { type: 'date' },
  min_total: { type: 'number' },
  max_total: { type: 'number' },

  user_id: { type: 'number' },
  user_gender: {
    type: 'enum',
    values: ['male', 'female']
  },

  product_id: { type: 'number' },
  product_category: { type: 'string' },

  page: { type: 'number' },
  limit: { type: 'number' },
};

export default ALLOWED_QUERY_PARAMS;
