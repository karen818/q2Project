
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          username: 'gromkii',
          full_name: 'Dax',
          email: 'dax@dax.com',
          img_url: 'http://placecage.com/c/200/200',
          password: 'itsdax',
          is_admin: true
        }),
        knex('users').insert({
          username: 'hey',
          full_name: 'A Cool Dude',
          email: 'dax@dax.com',
          img_url: 'http://placecage.com/c/200/200',
          password: ''
        }),
        knex('users').insert({
          username: 'herp',
          full_name: 'Nerp',
          email: 'dax@dax.com',
          img_url: 'http://placecage.com/c/200/200',
          password: ''
        })
      ]);
    }).then(() => {
      return Promise.all([
        knex('advice_types').insert({
          advice_type: 'To Do'
        }),
        knex('advice_types').insert({
          advice_type: 'To Avoid'
        }),
        knex('advice_types').insert({
          advice_type: 'To Eat'
        })
      ]);
    }).then(() => {
      return Promise.all([
        knex('cities').insert({
          city_name:'Austin,TX'
        }),
        knex('cities').insert({
          city_name:'Dallas,TX'
        }),
        knex('cities').insert({
          city_name:'Houston,TX'
        })
      ]);
    }).then(() => {
      return Promise.all([
        knex('months').insert({ month: 'January' }),
        knex('months').insert({ month: 'February' }),
        knex('months').insert({ month: 'March' }),
        knex('months').insert({ month: 'April' }),
        knex('months').insert({ month: 'May' }),
        knex('months').insert({ month: 'June' }),
        knex('months').insert({ month: 'July' }),
        knex('months').insert({ month: 'August' }),
        knex('months').insert({ month: 'Sepetember' }),
        knex('months').insert({ month: 'October' }),
        knex('months').insert({ month: 'November' }),
        knex('months').insert({ month: 'December' })
      ]);
    }).then(() => {
      return Promise.all([
        knex('advice_post').insert({
          user_id: 1,
          advice_text: 'My life is a lie.',
          advice_type: 2,
          month_id: 3,
          city_id: 3,
        }),
        knex('advice_post').insert({
          user_id: 2,
          advice_text: 'SCREEEE',
          advice_type: 1,
          month_id: 2,
          city_id: 3,
        }),
        knex('advice_post').insert({
          user_id: 1,
          advice_text: 'Im listening to Tame Impala right now.',
          advice_type: 1,
          month_id: 1,
          city_id: 1,
        })
      ]);
    });
};
