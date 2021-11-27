/**
 * This script is to create index inside the collection users of the database quizzine
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('users').createIndex({ username: 1 }, { unique: true });
db.getCollection('users').createIndex({ email: 1 }, { unique: true });

db.getCollection('questions').createIndex(({ id: 1 }, { unique: true }));
