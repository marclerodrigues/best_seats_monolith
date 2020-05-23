require "rails_helper"

RSpec.describe Seats::JsonBuilder do
  describe ".call" do
    let(:venue) { create(:venue) }
    let(:seat_a1) { create(:seat, column: 1, row: "a", label: "a1", available: true, venue: venue) }
    let(:seat_a2) { create(:seat, column: 2, row: "a", label: "a2", available: false, venue: venue) }
    let(:seats) { [seat_a1, seat_a2] }
    let(:expected_result) do
      {
        seats: {
         "a1" => {
            "column" => 1,
            "row" => "a",
            "label" => "a1",
            "available" => true,
            "venue_id" => venue.id
          },
         "a2" => {
            "column" => 2,
            "row" => "a",
            "label" => "a2",
            "available" => false,
            "venue_id" => venue.id
          }
        }
      }
    end

    subject { described_class.call(seats) }

    it "return the correct value" do
      expect(subject).to eq(expected_result)
    end
  end
end
