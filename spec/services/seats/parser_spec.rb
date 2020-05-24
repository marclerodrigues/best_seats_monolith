require "rails_helper"

RSpec.describe Seats::Parser do
  describe ".call" do
    context "when column has one digit" do
      let(:seat) { "a1" }

      subject { described_class.call(seat) }

      it "returns the correct row" do
        expect(subject.row).to eq("a")
      end

      it "returns the correct column" do
        expect(subject.column).to eq("1")
      end
    end

    context "when column has two digits or more" do
      let(:seat) { "a11" }

      subject { described_class.call(seat) }

      it "returns the correct row" do
        expect(subject.row).to eq("a")
      end

      it "returns the correct column" do
        expect(subject.column).to eq("11")
      end
    end
  end
end
