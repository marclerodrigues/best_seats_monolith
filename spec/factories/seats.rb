FactoryBot.define do
  factory :seat do
    row { "MyString" }
    column { 1 }
    available { true }
  end
end
