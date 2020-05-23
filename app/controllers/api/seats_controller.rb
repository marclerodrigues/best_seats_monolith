module Api
  class SeatsController < ApplicationController
    def index
      @seats = Seat.where(venue_id: params[:id]).select(:id, :row, :column, :available)

      render json: @seats
    end

    def update
      @seat = Seat.where(venue_id: params[:id]).find(params[:seat_id])

      if @seat.update(available: seat_params[:available])
        render json: {
          message: t('api.update.messages.success', record: 'Seat'),
          seat: @seat
        }, status: :ok
      else
        render json: {
          message: t('api.update.messages.error', record: 'Seat')
        }, status: :unprocessable_entity
      end
    end

    private

    def seat_params
      params.require(:seat).permit(:available)
    end
  end
end
