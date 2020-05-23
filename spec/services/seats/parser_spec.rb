require "rails_helper"

RSpec.describe Seats::Parser do
  describe ".call" do
    let(:seat) { "a1" }

    subject { described_class.call(seat) }

    it "returns the correct row" do
      expect(subject.row).to eq("a")
    end

    it "returns the correct column" do
      expect(subject.column).to eq("1")
    end
  end
end
