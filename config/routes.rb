Rails.application.routes.draw do
  namespace :api do
    resources :venues, only: [:index, :create]
  end
end
