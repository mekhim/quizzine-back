/**
 * This script is to insert initial data inside the collection users of the database quizzine
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('tags').drop();
db.getCollection('tags').insertMany([
  {
    name: 'fruit',
    image: 'https://randomuser.me/portraits/men/55.jpg',
  },
  {
    name: 'dessert',
    image: 'https://randomuser.me/portraits/men/55.jpg',
  },
]);
db.getCollection('users').drop();
db.getCollection('users').insertMany([
  {
    image: 'https://randomuser.me/portraits/men/55.jpg',
    email: 'michel.berger@gmail.com',
    username: 'Michel',
    password: 'berger',
    stats: {
      exp: 200,
      goodAnswers: 1000,
      totalAnswers: 2000,
    },
    isAdmin: true,
  },
  {
    image: 'https://randomuser.me/portraits/men/56.jpg',
    email: 'france.gall@gmail.com',
    username: 'France',
    password: 'Gall',
    stats: {
      exp: 160,
      goodAnswers: 990,
      totalAnswers: 2000,
    },
    isAdmin: false,
  },
]);

db.getCollection('users').find({});
