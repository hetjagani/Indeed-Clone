## Should add this to config

```
"s3_access_key": "",
"s3_secret_key": "",
"s3_region": "",
"s3_bucket_name": "",
```

## API

DB Objects: employers, companies, jobs (Mongo)

- /employers

  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id

- /companies

  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id

- /companies/:id/jobs

  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id

- /companies/:id/reviews

  - GET /
  - GET /:id
  - PUT /:id {isFeatured: bool} (mark it as featured)

- /companies/:id/salaries

  - GET /
  - GET /:id

- /companies/:id/applications

  - GET /
  - GET /:id
  - PUT /:id {status: string} (update status of application)

- /companies/:id/photos

  - GET /
  - GET /:id
  - PUT /:id {isFeatured: bool} (mark it as featured)

- GET /jobs (with filters)
- GET /jobs/:id
