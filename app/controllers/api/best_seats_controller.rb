require "best_seats/finder"

module Api
  class BestSeatsController < ApplicationController
    def create
      available_seats = ::Venues::JsonBuilder.call(params[:id])
      finder = ::BestSeats::Finder.new(available_seats, seats_params[:requested_count].to_i)

      render json: finder.all
    end

    private

    def seats_params
      params.require(:seats).permit(:requested_count)
    end
  end
end
