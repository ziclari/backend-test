/* eslint-disable no-undef */
db = db.getSiblingDB('test_db');

db.createUser({
  user: 'user_db',
  pwd: 'password_db',
  roles: [{ role: 'readWrite', db: 'test_db' }],
});
