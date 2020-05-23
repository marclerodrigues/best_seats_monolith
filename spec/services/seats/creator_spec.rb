require "rails_helper"

RSpec.describe Seats::Creator do
  describe ".call" do
    context "with default matrix_creator and default seats parser" do
      let(:venue) { create(:venue, rows: 2, columns: 2) }
      let(:params) { { venue_id: venue.id } }

      subject { described_class.call(params) }

      it "creates the correct amount of seats" do
        expect {
          subject
        }.to change(Seat, :count).from(0).to(4)
      end

      it "creates the correct seats" do
        subject
        seats = venue.reload.seats.pluck(:row, :column, :label)
        expected_seats = [
          ['a', 1, 'a1'],
          ['a', 2, 'a2'],
          ['b', 1, 'b1'],
          ['b', 2, 'b2']
        ]
        expect(seats).to eq(expected_seats)
      end
    end

    context "with custom matrix creator" do
      let(:custom_matrix_creator) { double }
      let(:venue) { create(:venue, rows: 2, columns: 2) }
      let(:params) do
        { venue_id: venue.id, matrix_creator: custom_matrix_creator }
      end

      subject { described_class.call(params) }

      it "calls the correct methods in the customer matrix creator" do
        expect(custom_matrix_creator).to receive(:new).with(2, 2, []).and_return(custom_matrix_creator)
        expect(custom_matrix_creator).to receive(:all).and_return([])

        subject
      end
    end

    context "with custom seats parser" do
      let(:custom_seats_parser) { double(row: 'a', column: 1) }
      let(:venue) { create(:venue, rows: 2, columns: 2) }
      let(:params) do
        { venue_id: venue.id, seats_parser: custom_seats_parser }
      end

      subject { described_class.call(params) }

      it "calls the correct methods in the customer matrix creator" do
        expect(custom_seats_parser).to receive(:call).exactly(4).times.and_return(custom_seats_parser)

        subject
      end
    end
  end
end
