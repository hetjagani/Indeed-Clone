## Should add this to config
```
"s3_access_key": "AKIAVEYWO6SSQC5AZUOE",
"s3_secret_key": "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",
"s3_region": "us-east-1",
"s3_bucket_name": "indeed-media",
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
