require 'rails_helper'

RSpec.describe Venue, type: :model do
  describe "relations" do
    it { is_expected.to have_many(:seats).dependent(:destroy) }
  end
end
