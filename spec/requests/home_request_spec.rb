require 'rails_helper'

RSpec.describe "Home", type: :request do
  describe "GET /" do
    it "returns the correct response" do
      get api_venues_path
      expect(response).to have_http_status(200)
    end
  end
end
