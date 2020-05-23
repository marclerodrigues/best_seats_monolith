module Venues
  class JsonBuilder
    def self.call(venue_id)
      new(venue_id).call
    end

    def initialize(venue_id)
      @venue_id = venue_id
    end

    def call
      { venue: layout }.merge(seats_json)
    end

    private

    attr_reader :venue_id

    def layout
      {
        layout: {
          rows: venue.rows,
          columns: venue.columns
        }
      }
    end

    def seats_json
      @_seats_json ||= ::Seats::JsonBuilder.call(seats)
    end

    def seats
      @_seats = venue.seats.available
    end

    def venue
      @_venue ||= Venue.find(venue_id)
    end
  end
end
