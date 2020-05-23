Rails.application.routes.draw do
  namespace :api do
    resources :venues, only: [:index, :create] do
      member do
        resources :seats, only: [:index, :update], param: :seat_id do
          collection do
            put :batches, to: "seats/batches#update", as: :batch_update
          end
        end
      end
    end
  end
end
