Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'products', to: 'products#index'
  get 'products/:id', to: 'products#show'

  post 'users/sign_up', to: 'users#create'
  post 'users/login', to: 'sessions#create'
  delete 'users/logout', to: 'sessions#destroy'
  get 'users/is_logged_in', to: 'sessions#is_logged_in'

  # Defines the root path route ("/")
  root "home#index"
end
