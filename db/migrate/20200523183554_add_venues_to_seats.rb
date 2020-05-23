class AddVenuesToSeats < ActiveRecord::Migration[6.0]
  def change
    add_reference :seats, :venue, null: false, foreign_key: true, index: true
  end
end
