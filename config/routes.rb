Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'products', to: 'products#index'
  get 'products/:id', to: 'products#show'

  # Defines the root path route ("/")
  root "home#index"
end
