require "rails_helper"

RSpec.describe Venues::Creator do
  describe ".call" do
    context "with default seats creator" do
      let(:params) do
        {
          name: 'New Venue',
          rows: 1,
          columns: 2,
        }
      end

      subject { described_class.call(params) }

      it "creates a new venue" do
        expect {
          subject
        }.to change(Venue, :count).from(0).to(1)
      end

      it "creates a venue with the correct attributes" do
        subject
        venue_attributes = Venue.last.attributes
        expect(venue_attributes.slice(*"name", "rows", "columns")).to eq(params.stringify_keys)
      end

      it "create venue seats" do
        expect {
          subject
        }.to change(Seat, :count).from(0).to(2)
      end
    end

    context "with a custom seats creator" do
      let(:custom_seat_creator) { double }
      let(:params) do
        {
          name: 'New Venue',
          rows: 1,
          columns: 2,
          seats_creator: custom_seat_creator
        }
      end

      subject { described_class.call(params) }

      it "call the correct method in the custom seat creator" do
        expect(custom_seat_creator).to receive(:call)

        subject
      end
    end
  end

  describe "#venue" do
    let(:params) do
      {
        name: 'New Venue',
        rows: 1,
        columns: 2,
      }
    end

    subject { described_class.new(params) }

    it "creates returns the venue" do
      subject.call
      expect(subject.venue).to eq(Venue.last)
    end
  end
end
