Rails.application.routes.draw do
  # Administrate
  namespace :admin do
    resources :users
    resources :products
    resources :orders
    resources :featured_products

    root to: "users#index"
  end

  # Clearance
  scope '/admin' do
    resources :passwords, controller: "clearance/passwords", only: [:create, :new]
    resource :session, controller: "clearance/sessions", only: [:create]

    resources :users, controller: "clearance/users", only: [:create] do
      resource :password,
               controller: "clearance/passwords",
               only: [:edit, :update]
    end

    get "/sign_in" => "clearance/sessions#new", as: "sign_in"
    delete "/sign_out" => "clearance/sessions#destroy", as: "sign_out"
    # get "/sign_up" => "clearance/users#new", as: "sign_up"
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'products', to: 'products#index'
  get 'products/:id', to: 'products#show'
  get 'featured_products', to: 'products#featured'

  post 'users/sign_up', to: 'users#create'
  post 'users/login', to: 'sessions#create'
  delete 'users/logout', to: 'sessions#destroy'
  get 'users/is_logged_in', to: 'sessions#is_logged_in'

  resources :orders

  # Defines the root path route ("/")
  root "home#index"
end
