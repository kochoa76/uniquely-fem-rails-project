Rails.application.routes.draw do
root 'application#home'
resources :users
resources :companies do
  resources :reviews
end
resources :reviews, only: [:new, :create]

resources :users do
    resources :reviews, only: [:show ]
  end

get 'company_reviews/highest_rated' => "reviews#highest_rated"
# get 'auth/:provider/callback', to: 'sessions#create'
get 'auth/facebook/callback' => 'sessions#create'
get '/signin' => "sessions#new"
post '/signin' => "sessions#create"
get '/signout' => "sessions#destroy"
post '/signout'=> "sessions#destroy"
 # delete '/logout' => 'sessions#delete'

end
