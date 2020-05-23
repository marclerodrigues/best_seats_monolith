require 'rails_helper'

RSpec.describe "Api::Seats::Batches", type: :request do
  describe "PUT /api/venues/:id/seats/batches" do
    let!(:venue) { create(:venue) }
    let!(:seats) { create_list(:seat, 5, venue: venue, available: false) }
    let(:seats_params) do
      {
        ids: seats.pluck(:id),
        available: true
      }
    end

    it "returns the correct response" do
      put batch_update_api_seats_path(id: venue.id), params: { seats: seats_params }

      expect(response).to have_http_status(200)
    end

    it "updates correctly all seats" do
      put batch_update_api_seats_path(id: venue.id), params: { seats: seats_params }

      parsed_body = JSON.parse(response.body)
      seats_updated = parsed_body.dig("seats").map { |seat| seat["available"] }.uniq
      expect(seats_updated).to eq([true])
    end

    it "returns the correct response body" do
      put batch_update_api_seats_path(id: venue.id), params: { seats: seats_params }

      parsed_body = JSON.parse(response.body)
      expected_body = {
        message: "Seat were successfuly updated.",
        seats: venue.seats.reload
      }.as_json

      expect(parsed_body).to eq(expected_body)
    end
  end
end
