## API
DB Objects: chats, messages (MySql)
* /chats {employerId, userId, subject}
  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id

* /chats/:id/messages {timestamp: ts, to: id, from: id, content: string}
  - GET /
  - GET /:id
  - POST /
  - DELETE /:id