FactoryBot.define do
  factory :seat do
    row { "MyString" }
    column { 1 }
    available { false }
  end
end
