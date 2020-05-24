module Seats
  class Parser
    attr_reader :seat, :row, :column

    def self.call(seat)
      new(seat).call
    end

    def initialize(seat)
      @seat = seat
    end

    def call
      split_seat = seat.to_s.split("")

      @row = split_seat.shift
      @column = split_seat.join
      self
    end
  end
end
