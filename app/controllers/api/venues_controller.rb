module Api
  class VenuesController < ApplicationController
    def index
      @venues = Venue.select(:id, :name, :rows, :columns).all

      render json: @venues
    end

    def create
      venue_creator = ::Venues::Creator.new(venue_params)

      if venue_creator.call
        render json: {
          message: t('api.create.messages.success', record: 'Venue'),
          venue: venue_creator.venue
        }, status: :ok
      else
        render json: {
          message: t('api.create.messages.error', record: 'Venue')
        }, status: :unprocessable_entity
      end
    end

    private

    def venue_params
      params.require(:venue).permit(:name, :rows, :columns)
    end
  end
end
