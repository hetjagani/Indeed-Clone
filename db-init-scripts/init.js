print('Start #################################################################');

db = db.getSiblingDB('company');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'auth' }],
});
db.createCollection('companies');

db = db.getSiblingDB('user');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'restaurant' }],
});
db.createCollection('users');

db = db.getSiblingDB('application');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'customer' }],
});
db.createCollection('applications');

db = db.getSiblingDB('review');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'order' }],
});
db.createCollection('reviews');

print('END #################################################################');
