require 'rails_helper'

RSpec.describe "Api::Venues", type: :request do
  describe "GET /api/venues" do
    context "when there is no venues" do
      it "returns the correct response" do
        get api_venues_path
        expect(response).to have_http_status(200)
      end

      it "returns the correct response body" do
        get api_venues_path

        parsed_body = JSON.parse(response.body)
        expect(parsed_body).to eq([])
      end
    end
  end

  context "when there are venues" do
    let!(:venue) { create(:venue) }
    let(:expected_body) do
      [
        {
          id: venue.id,
          name: venue.name,
          rows: venue.rows,
          columns: venue.columns
        }.stringify_keys
      ]
    end

    it "returns the correct response" do
      get api_venues_path
      expect(response).to have_http_status(200)
    end

    it "returns the correct response body" do
      get api_venues_path

      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to eq(expected_body)
    end
  end

  describe "POST /api/venues" do
    context "when venue is created sucessfully" do
      let(:venue_params) { attributes_for(:venue, rows: 2, columns: 2) }

      it "returns the correct response" do
        post api_venues_path, params: { venue: venue_params }

        expect(response).to have_http_status(200)
      end

      it "creates a new venue" do
        expect {
          post api_venues_path, params: { venue: venue_params }
        }.to change(Venue, :count).from(0).to(1)
      end

      it "creates the correct number of seats" do
        expect {
          post api_venues_path, params: { venue: venue_params }
        }.to change(Seat, :count).from(0).to(4)
      end

      it "returns the correct response" do
        post api_venues_path, params: { venue: venue_params }

        parsed_body = JSON.parse(response.body)
        expected_body = {
          message: "Venue was successfuly created.",
          venue: Venue.last
        }.as_json

        expect(parsed_body).to eq(expected_body)
      end
    end

    context "when venue could not be saved" do
      before do
        allow_any_instance_of(::Venues::Creator).to receive(:call).and_return(false)
      end

      let(:venue_params) { attributes_for(:venue) }

      it "returns the correct response" do
        post api_venues_path, params: { venue: venue_params }

        expect(response).to have_http_status(422)
      end

      it "does not create a new venue" do
        expect {
          post api_venues_path, params: { venue: venue_params }
        }.not_to change(Venue, :count)
      end

      it "does not create venue seats" do
        expect {
          post api_venues_path, params: { venue: venue_params }
        }.not_to change(Seat, :count)
      end

      it "returns the correct response" do
        post api_venues_path, params: { venue: venue_params }

        parsed_body = JSON.parse(response.body)
        expected_body = {
          message: "An error ocurred while creating Venue, please check the params and try again."
        }.as_json

        expect(parsed_body).to eq(expected_body)
      end
    end
  end
end
