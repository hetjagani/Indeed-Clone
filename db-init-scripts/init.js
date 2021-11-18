print('Start #################################################################');

db = db.getSiblingDB('company');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'company' }],
});
db.createCollection('companies');

db = db.getSiblingDB('user');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'user' }],
});
db.createCollection('users');

db = db.getSiblingDB('application');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'application' }],
});
db.createCollection('applications');

db = db.getSiblingDB('review');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'review' }],
});
db.createCollection('reviews');

print('END #################################################################');
