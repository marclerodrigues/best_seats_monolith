class Venue < ApplicationRecord
  has_many :seats, dependent: :destroy
end
