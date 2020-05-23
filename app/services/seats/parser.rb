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
      @row, @column = seat.to_s.split("")
      self
    end
  end
end
