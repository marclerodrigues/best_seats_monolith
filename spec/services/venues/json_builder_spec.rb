require "rails_helper"

RSpec.describe Venues::JsonBuilder do
  describe ".call" do
    let(:venue) { create(:venue, columns: 2, rows: 2) }
    let(:expected_result) do
      {
        venue: {
          layout: {
            rows: 2,
            columns: 2
          }
        },
        seats: {}
      }
    end

    subject { described_class.call(venue.id) }

    it "return the correct value" do
      expect(subject).to eq(expected_result)
    end
  end
end
