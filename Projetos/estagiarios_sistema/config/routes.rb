Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get 'welcome/index'

  get 'welcome/edit'
  post 'welcome/edit'

  get 'welcome/update'
  post 'welcome/update'

  get 'welcome/pdf_visualiza'

  get 'relatorio_centro/index'
  get 'relatorio_guarus/index'
  get 'relatoutros/index'

  get 'relatorio_centro/create'
  post 'relatorio_centro/create'

  get 'relatorio_centro/edit'
  post 'relatorio_centro/edit'

  get 'relatorio_centro/update'
  post 'relatorio_centro/update'

  get 'relatorio_guarus/create'
  post 'relatorio_guarus/create'

  get 'relatorio_guarus/edit'
  post 'relatorio_guarus/edit'

  get 'relatorio_guarus/update'
  post 'relatorio_guarus/update'

  get 'relatoutros/create'
  post 'relatoutros/create'

  get 'relatoutros/edit'
  post 'relatoutros/edit'

  get 'relatoutros/update'
  post 'relatoutros/update'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  devise_for :users, controllers: { registrations: 'users/registrations' }
end
