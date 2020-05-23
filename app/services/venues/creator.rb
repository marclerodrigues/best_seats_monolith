module Venues
  class Creator
    def self.call(params)
      new(params).call
    end

    def initialize(params)
      @name = params.fetch(:name)
      @rows = params.fetch(:rows)
      @columns = params.fetch(:columns)
      @seats_creator = params.fetch(:seats_creator, ::Seats::Creator)
    end

    def call
      ActiveRecord::Base.transaction do
        venue = create_venue
        seats_creator.call(venue_id: venue.id)
      end
    end

    def venue
      @_venue
    end

    private

    attr_reader :name, :rows, :columns, :seats_creator

    def create_venue
      @_venue = Venue.create!(name: name, rows: rows, columns: columns)
    end
  end
end
