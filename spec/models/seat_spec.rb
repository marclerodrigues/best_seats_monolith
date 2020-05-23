require 'rails_helper'

RSpec.describe Seat, type: :model do
  describe "relations" do
    it { is_expected.to belong_to(:venue) }
  end

  describe "scopes" do
    describe ".available" do
      let(:venue) { create(:venue) }
      let!(:available_seat) { create(:seat, available: true, venue: venue) }
      let!(:unavailable_seat) { create(:seat, available: false, venue: venue) }

      subject { described_class.available }

      it "returns only the available seats" do
        expect(subject).to contain_exactly(available_seat)
      end
    end
  end
end
