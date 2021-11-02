print('Start #################################################################');

db = db.getSiblingDB('auth');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'auth' }],
});
db.createCollection('users');

db = db.getSiblingDB('restaurant');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'restaurant' }],
});
db.createCollection('restaurants');

db = db.getSiblingDB('customer');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'customer' }],
});
db.createCollection('customers');

db = db.getSiblingDB('order');
db.createUser({
  user: 'uberadmin',
  pwd: 'uberadminpass',
  roles: [{ role: 'readWrite', db: 'order' }],
});
db.createCollection('orders');

print('END #################################################################');
