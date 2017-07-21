exports.seed = (knex, Promise) => (
  knex('users').del().then(() => (
    Promise.all([
      knex('users').insert({
        id: 1,
        first_name: 'Tyler',
        last_name: 'Bettilyon',
        email: 'teb311@gmail.com',
        username: 'teb311',
        hashed_password: '$2a$12$SSrZvsR.0Ki6pZp8Jhtlq.e9/kuT.T1H8Xc1ePTquNy.qKxEXNKPS',
      }),
      knex('users').insert({
        id: 2,
        first_name: 'Parker',
        last_name: 'Lewis',
        email: 'parker@gmail.com',
        username: 'parker',
        hashed_password: '$2a$12$SSrZvsR.0Ki6pZp8Jhtlq.e9/kuT.T1H8Xc1ePTquNy.qKxEXNKPS',
      }),
      knex('users').insert({
        id: 3,
        first_name: 'Robert',
        last_name: 'Murray',
        email: 'robertmurray@gmail.com',
        username: 'robertmurray',
        hashed_password: '$2a$12$SSrZvsR.0Ki6pZp8Jhtlq.e9/kuT.T1H8Xc1ePTquNy.qKxEXNKPS',
      }),
      knex('users').insert({
        id: 4,
        first_name: 'Hamid',
        last_name: 'Aghdaee',
        email: 'hamid.aghdaee@gmail.com',
        username: 'hamid.aghdaee',
        hashed_password: '$2a$12$SSrZvsR.0Ki6pZp8Jhtlq.e9/kuT.T1H8Xc1ePTquNy.qKxEXNKPS',
      }),
      knex('users').insert({
        id: 5,
        first_name: 'Yubo',
        last_name: 'Diwu',
        email: 'yubo.diwu@gmail.com',
        username: 'yubodiwu',
        hashed_password: '$2a$12$SSrZvsR.0Ki6pZp8Jhtlq.e9/kuT.T1H8Xc1ePTquNy.qKxEXNKPS',
      }),
    ])
  )).then(() => (
    knex.raw('SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM users));')
  ))
);
