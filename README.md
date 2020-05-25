# Best Seats Monolith

A web application that allows you to find the best available seat for a given venue.

![](best-seats.gif)

### Dependencies
 - ruby 2.6.3
 - rails 6.0.3
 - postgresql (PostgresQL) 11.2
 - best_seats 0.1.0
 - node 12.0
 - react 16.13.1

### Setup

Copy the database settings sample and add your database settings.

```shell
cp config/database.yml.sample config/database.yml
```

Install Ruby and JavaScript dependencies:

```shell
bundle install
yarn install
```

Create the database and run the migrations:
```shell
bundle exec rails db:create
bundle exec rails db:migrate
```
Run the test suite to make sure everything is ready to go:

```shell
bundle exec rspec
```

You can also run the javascript test suite:
```
yarn jest
```

You should see all green. In case of any errors double check you setup steps and settings.

After that run the application:

```shell
bundle exec rails server
```

In development you will also need to run the webpack-dev-server:
```
./bin/webpack-dev-server
```

You will be able to access the application on:
```
http://localhost:3000/
```

## API Documentation

List Venues
====
Request:
```
GET /api/venues
```

Response:
```json
[
 { "id": "1", "name": "Venue", "rows": "1", "columns": "2" }
]
```
Status:
```
200
```

Create Venue
====
Request:
```
POST /api/venues
```

body:
```json
{
  "venue": {
    "name": "Venue",
    "rows": 4,
    "columns": 4
  }
}
```

Response:
```json
{
  "venue": { "id": "1", "name": "Venue", "rows": "4", "columns": "4" },
  "message": "Venue was successfuly created."
}
```

Status:
```
200
```

Delete Venue
====
Request:
```
DELETE /api/venues/:id
```

Response:
```json
{
  "message": "Venue was successfuly destroyed."
}
```

Status:
```
200
```

List Venue Seats
====
Request:
```
GET api/venues/:id/seats
```


Response:
```json
[
 { "id": 1, "column": 1, "row": "a", "available": true, "label": "a1", "venue_id": 1 }
]
```

Status:
```
200
```

Update Venue Seat
====
Request:
```
PUT api/venues/:id/seats/:seat_id
```

body:
```json
{
  "seat": {
   "available": false
  }
}
```


Response:
```json
{
 "message": "Seat was successfuly updated.",
 "seat": { "id": 1, "column": 1, "row": "a", "available": true, "label": "a1", "venue_id": 1 }
}
```

Status:
```
200
```

Batch Update Venue Seat
====
Request:
```
PUT api/venues/:id/seats/batches
```

body:
```json
{
  "seats": {
   "ids": [1, 3, 4, 5],
   "available": false
  }
}
```


Response:
```json
{
  "message": "Seats were successfuly updated.",
 "seats": [
  { "id": 1, "column": 1, "row": "a", "available": false, "label": "a1", "venue_id": 1 }
  ]
}
```

Status:
```
200
```

Best Seats
====
Request:
```
POST /api/venues/:id/best_seats
```

body:
```json
{
  "seats": {
   "requested": 1
   }
}
```

Response:
```json
["a4"]
```

Status:
```
200
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/marclerodrigues/best_seats_monolith

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
