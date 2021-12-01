print('Start #################################################################');

db = db.getSiblingDB('company');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'company' }],
});
db.createCollection('companies');

db = db.getSiblingDB('company_test');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'company_test' }],
});
db.createCollection('companies');


db = db.getSiblingDB('user');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'user' }],
});
db.createCollection('users');

db = db.getSiblingDB('user_test');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'user_test' }],
});
db.createCollection('users');

db = db.getSiblingDB('application');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'application' }],
});
db.createCollection('applications');

db = db.getSiblingDB('application_test');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'application_test' }],
});
db.createCollection('applications');

db = db.getSiblingDB('review');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'review' }],
});
db.createCollection('reviews');

db = db.getSiblingDB('review_test');
db.createUser({
  user: 'indeedadmin',
  pwd: 'indeedadminpass',
  roles: [{ role: 'readWrite', db: 'review_test' }],
});
db.createCollection('reviews');

print('END #################################################################');
