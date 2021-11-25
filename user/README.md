## Should add this to config
```
"s3_access_key": "",
"s3_secret_key": "",
"s3_region": "",
"s3_bucket_name": "",
```

## API
DB Objects: users, salaries (Mongo)
* /users
  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id

* /users/:id/reviews
  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id

* /users/:id/salaries
  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id

* /users/:id/photos
  - GET /
  - GET /:id
  - POST /
  - DELETE /:id

* /users/:id/applications
  - GET /
  - GET /:id
  - POST /
  - PUT /:id

* GET /salaries (with filters)
* GET /salaries/:id 
