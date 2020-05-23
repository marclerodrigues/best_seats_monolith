class AddLabelToSeats < ActiveRecord::Migration[6.0]
  def change
    add_column :seats, :label, :string
  end
end
