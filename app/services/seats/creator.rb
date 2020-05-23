require "best_seats/matrix"

module Seats
  class Creator
    def self.call(params)
      new(params).call
    end

    def initialize(params)
      @venue_id = params.fetch(:venue_id)
      @matrix_creator = params.fetch(:matrix_creator, ::BestSeats::Matrix)
      @seats_parser = params.fetch(:seats_parser, ::Seats::Parser)
    end

    def call
      matrix.each do |venue_row|
        venue_row.each do |seat|
          parsed_seat = seats_parser.call(seat)
          Seat.create!(
            row: parsed_seat.row,
            column: parsed_seat.column,
            label: seat,
            venue: venue,
          )
        end
      end
    end

    private

    attr_reader :venue_id, :matrix_creator, :seats_parser

    delegate :rows, :columns, to: :venue

    def matrix
      @_matrix = matrix_creator.new(
        rows,
        columns,
        []
      ).all
    end

    def venue
      @_venue ||= Venue.find(venue_id)
    end
  end
end
