exports.seed = knex => (knex('ingredients').then(() => (
  knex('ingredients').insert([
    {
      id: 98,
      upc: '782645787019',
      plu: null,
      product_name: 'Kirkland Organic Extra Virgin Olive Oil 3.6 fl oz.',
      name: 'extra-virgin olive oil',
    }, {
      id: 99,
      upc: '096619261000',
      plu: null,
      product_name: 'Kirkland Signature 6.3 Oz Tellicherry Black Pepper Grinder',
      name: 'black pepper',
    }, {
      id: 100,
      upc: '013600020019',
      plu: null,
      product_name: 'Diamond Crystal Kosher Salt',
      name: 'kosher salt',
    }, {
      id: 101,
      upc: '234779811561',
      plu: null,
      product_name: 'Kirkland Signature Costco Pecorino R Romano',
      name: 'pecorino romano cheese',
    }, {
      id: 102,
      upc: '015800064114',
      plu: null,
      product_name: 'C&H, Pure Cane, Dark Brown Sugar, 16oz Box (Pack of 4)',
      name: 'dark brown sugar',
    }, {
      id: 103,
      upc: '609207320128',
      plu: null,
      product_name: 'Trader Joe\'s Semi Sweet Chocolate Chips 12 Oz. Bag',
      name: 'semi sweet chocolate chips',
    }, {
      id: 104,
      upc: '072400711244',
      plu: null,
      product_name: 'Grandma\'s Molasses Unsulfured',
      name: 'molasses',
    }, {
      id: 105,
      upc: '033200011101',
      plu: null,
      product_name: 'Arm & Hammer Baking Soda 16 Oz',
      name: 'baking soda',
    }, {
      id: 106,
      upc: '016000104105',
      plu: null,
      product_name: 'Gold Medal Flour All Purpose, 10 lb',
      name: 'all-purpose flour',
    },
  ])
)).then(() => (
  knex.raw('SELECT setval(\'ingredients_id_seq\', (SELECT MAX(id) FROM ingredients));')
)));
