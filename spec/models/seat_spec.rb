require 'rails_helper'

RSpec.describe Seat, type: :model do
  describe "relations" do
    it { is_expected.to belong_to(:venue) }
  end
end
