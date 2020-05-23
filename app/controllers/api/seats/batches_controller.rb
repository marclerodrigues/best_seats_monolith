module Api
  module Seats
    class BatchesController < ApplicationController
      def update
        @seats = Seat.where(venue_id: params[:id]).where(id: batch_update_params[:ids])

        @seats.update_all(available: batch_update_params[:available])

        render json: {
          message: t('api.batch_update.messages.success', record: 'Seat'),
          seats: @seats
        }, status: :ok
      end

      private

      def batch_update_params
        params.require(:seats).permit(:available, ids: [])
      end
    end
  end
end
