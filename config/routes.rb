Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    resources :venues, only: [:index, :create, :destroy] do
      member do
        resources :seats, only: [:index, :update], param: :seat_id do
          collection do
            put :batches, to: "seats/batches#update", as: :batch_update
          end
        end

        resources :best_seats, only: :create
      end
    end
  end
end
