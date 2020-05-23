module Seats
  class JsonBuilder
    ATTRIBUTES = [
      "column",
      "row",
      "label",
      "venue_id",
      "available"
    ]

    def self.call(seats)
      new(seats).call
    end

    def initialize(seats)
      @seats = seats
    end

    def call
      {
        seats: json
      }
    end

    private

    attr_reader :seats

    def json
      return @_json if defined?(@_json)


      @_json = seats.inject({}) do |memo, seat|
        memo[seat.label] = seat.attributes.slice(*::Seats::JsonBuilder::ATTRIBUTES)
        memo
      end
    end
  end
end
