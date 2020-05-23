class Seat < ApplicationRecord
  belongs_to :venue

  scope :available, -> { where(available: true) }
end
