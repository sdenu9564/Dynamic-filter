const FILTERS_CONFIG = [
  {
    key: 'order_status',
    title: 'Order Status',
    type: 'enum',
    options: ['placed', 'shipped', 'delivered', 'cancelled']
  },
  {
    key: 'user_id',
    title: 'User',
    type: 'number'
  },
  {
    key: 'product_id',
    title: 'Product',
    type: 'number'
  },
  {
    key: 'product_category',
    title: 'Product Category',
    type: 'string'
  },
  {
    key: 'start_date',
    title: 'Start Date',
    type: 'date'
  },
  {
    key: 'end_date',
    title: 'End Date',
    type: 'date'
  },
  {
    key: 'min_total',
    title: 'Min Amount',
    type: 'number'
  },
  {
    key: 'max_total',
    title: 'Max Amount',
    type: 'number'
  }
];

export default FILTERS_CONFIG;
