/**
 * This script is to insert initial data inside the collection users of the database quizzine
 * You can use it with mongo-shell or a tool like Robo3T
 */

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

db.getCollection('questions').insertMany([
  {
    question: 'Comment est votre blanquette ?',
    answers: ['oui', 'non', 'pourquoi pas'],
    tags: ['viande', 'Gastronomie française'],
  },
  {
    tags: ['viande', 'Gastronomie française', 'oss117'],
    answers: ['oui', 'non', 'pourquoi pas'],
    question: 'Comment est votre blanquette ?',
  },
]);

db.getCollection('users').find({});

db.getCollection('questions').find({});
