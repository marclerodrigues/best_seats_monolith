require 'rails_helper'

RSpec.describe "Api::BestSeats", type: :request do
  describe "GET /api/venues/:id/best_seats" do
    context "when there are available seats" do
      let(:venue) { create(:venue, rows: 2, columns: 2) }
      let!(:seat_a1) { create(:seat, label: 'a1', column: 1, row: 'a', venue: venue) }
      let!(:seat_a2) { create(:seat, label: 'a2', column: 2, row: 'a', venue: venue) }
      let!(:seat_b1) { create(:seat, label: 'b1', column: 1, row: 'b', available: false, venue: venue) }
      let!(:seat_b2) { create(:seat, label: 'b2', column: 2, row: 'b', available: false, venue: venue) }
      let(:best_seats_params) do
        {
          seats: {
            requested_count: 1
          }
        }
      end

      it "returns the correct response" do
        get api_best_seats_path(id: venue.id), params: best_seats_params
        expect(response).to have_http_status(200)
      end

      it "returns the correct response body" do
        get api_best_seats_path(id: venue.id), params: best_seats_params

        parsed_body = JSON.parse(response.body)
        expect(parsed_body).to eq(["a1"])
      end
    end
  end

  context "when there are not available seats" do
    let(:venue) { create(:venue, rows: 2, columns: 2) }
    let!(:seat_a1) { create(:seat, label: 'a1', column: 1, row: 'a', available: false, venue: venue) }
    let!(:seat_a2) { create(:seat, label: 'a2', column: 2, row: 'a', available: false, venue: venue) }
    let!(:seat_b1) { create(:seat, label: 'b1', column: 1, row: 'b', available: false, venue: venue) }
    let!(:seat_b2) { create(:seat, label: 'b2', column: 2, row: 'b', available: false, venue: venue) }
    let(:best_seats_params) do
      {
        seats: {
          requested_count: 1
        }
      }
    end

    it "returns the correct response" do
      get api_best_seats_path(id: venue.id), params: best_seats_params
      expect(response).to have_http_status(200)
    end

    it "returns the correct response body" do
      get api_best_seats_path(id: venue.id), params: best_seats_params

      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to eq([])
    end
  end

  context "when there are not enough available seats" do
    let(:venue) { create(:venue, rows: 2, columns: 2) }
    let!(:seat_a1) { create(:seat, label: 'a1', column: 1, row: 'a', venue: venue) }
    let!(:seat_a2) { create(:seat, label: 'a2', column: 2, row: 'a', available: false, venue: venue) }
    let!(:seat_b1) { create(:seat, label: 'b1', column: 1, row: 'b', available: false, venue: venue) }
    let!(:seat_b2) { create(:seat, label: 'b2', column: 2, row: 'b', available: false, venue: venue) }
    let(:best_seats_params) do
      {
        seats: {
          requested_count: 2
        }
      }
    end

    it "returns the correct response" do
      get api_best_seats_path(id: venue.id), params: best_seats_params
      expect(response).to have_http_status(200)
    end

    it "returns the correct response body" do
      get api_best_seats_path(id: venue.id), params: best_seats_params

      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to eq([])
    end
  end
end
