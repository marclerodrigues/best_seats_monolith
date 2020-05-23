require 'rails_helper'

RSpec.describe "Api::Seats", type: :request do
  describe "GET /api/venues/:id/seats" do
    let!(:venue) { create(:venue, rows: 2, columns: 2) }

    context "when there are no seats" do
      it "returns the correct response" do
        get api_seats_path(id: venue.id)
        expect(response).to have_http_status(200)
      end

      it "returns the correct response body" do
        get api_seats_path(id: venue.id)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body).to eq([])
      end
    end
  end

  context "when there are seats" do
    let!(:venue) { create(:venue, rows: 2, columns: 2) }
    let!(:seat) { create(:seat, venue: venue, row: "a", column: 1) }
    let(:expected_body) do
      [
        {
          id: seat.id,
          row: seat.row,
          column: seat.column,
          available: seat.available
        }.stringify_keys
      ]
    end

    it "returns the correct response" do
      get api_seats_path(id: venue.id)
      expect(response).to have_http_status(200)
    end

    it "returns the correct response body" do
      get api_seats_path(id: venue.id)

      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to eq(expected_body)
    end
  end

  describe "PUT /api/venues/:id/seats/:id" do
    let!(:venue) { create(:venue) }
    let!(:seat) { create(:seat, venue: venue, available: true) }

    context "when seat is updated sucessfully" do
      let(:seat_params) { { available: false } }

      it "returns the correct response" do
        patch api_seat_path(id: venue.id, seat_id: seat.id), params: { seat: seat_params }

        expect(response).to have_http_status(200)
      end

      it "updates correctly the seat" do
        patch api_seat_path(id: venue.id, seat_id: seat.id), params: { seat: seat_params }

        parsed_body = JSON.parse(response.body)
        expect(parsed_body.dig("seat", "available")).to be(false)
      end

      it "returns the correct response" do
        patch api_seat_path(id: venue.id, seat_id: seat.id), params: { seat: seat_params }

        parsed_body = JSON.parse(response.body)
        expected_body = {
          message: "Seat was successfuly updated.",
          seat: Seat.last
        }.as_json

        expect(parsed_body).to eq(expected_body)
      end
    end

    context "when seat could not be updated" do
      before do
        allow_any_instance_of(::Seat).to receive(:update).and_return(false)
      end

      let(:seat_params) { { available: false } }

      it "returns the correct response" do
        patch api_seat_path(id: venue.id, seat_id: seat.id), params: { seat: seat_params }

        expect(response).to have_http_status(422)
      end

      it "does not create a new venue" do
        expect {
          patch api_seat_path(id: venue.id, seat_id: seat.id), params: { seat: seat_params }
        }.not_to change(seat.reload, :available)
      end

      it "returns the correct response" do
        patch api_seat_path(id: venue.id, seat_id: seat.id), params: { seat: seat_params }

        parsed_body = JSON.parse(response.body)
        expected_body = {
          message: "An error ocurred while updating Seat, please check the params and try again."
        }.as_json

        expect(parsed_body).to eq(expected_body)
      end
    end
  end
end
