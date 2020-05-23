# Best Seats Monolith

A web application that allows you to find the best available seat for a given venue.

### Dependencies
 - ruby 2.6.3
 - rails 6.0.3
 - postgresql (PostgresQL) 11.2
 - best_seats 0.1.0

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

You should see all green. In case of any errors double check you setup steps and settings.

After that run the application:

```shell
bundle exec rails server
```
## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/marclerodrigues/best_seats_monolith

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
