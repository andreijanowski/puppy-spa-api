# API

Puppy Spa application back-end

### Getting Started

```sh
# install dependencies
$ npm install
# start server
$ npm start
# project will be available on http://localhost:8080
# files will automatically rebuild and refresh the browser as you make changes
```

### Directory Layout

```
.
├── /src/                       # The source code of the application
│   ├── /controllers/           # The controllers in each route
│   ├── /models/                # The models for each entity
│   ├── /routes/                # API routes
│   ├── /errors/                # Error hanlders
│   ├── app.ts                  # App configurations
│   ├── index.ts                # Entry point of this app
│   ├── setupMongoose.ts        # Connection with mongo
├── .env.template               # ENV vars for local development
│── nodemon.json                # Nodemon configuration
└── package.json                # The list of 3rd party libraries and utilities
```

