Rails.application.routes.draw do
  get 'relatorio_publico/new'
  get 'relatorio_publico/create'
  post 'relatorio_publico/create'

  get 'relatorio_particular/new'
  get 'relatorio_particular/create'
  post 'relatorio_particular/create'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  get 'welcome/index'

  get 'welcome/edit'
  post 'welcome/edit'

  get 'welcome/update'
  post 'welcome/update'

  get 'welcome/status_impressao'
  post 'welcome/status_impressao'

  get 'welcome/pdf_visualiza'

  get 'relatorio_centro/index'
  get 'relatorio_guarus/index'

  get 'relatorio_publico/index'

  get 'relatorio_particular/index'
  get 'relatorio_particular/edit'

  get 'relatorio_naoformal/index'
  get 'relatorio_naoformal/edit'

  get 'relatorio_naoformal/create'
  post 'relatorio_naoformal/create'

  get 'relatorio_naoformal/edit'
  post 'relatorio_naoformal/edit'

  get 'relatorio_naoformal/update'
  post 'relatorio_naoformal/update'

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

  get 'relatorio_publico/create'
  post 'relatorio_publico/create'

  get 'relatorio_publico/edit'
  post 'relatorio_publico/edit'

  get 'relatorio_publico/update'
  post 'relatorio_publico/update'

  get 'admin_relatorio/particular_index'
  get 'admin_relatorio/publico_index'
  get 'admin_relatorio/centro_index'
  get 'admin_relatorio/guarus_index'
  get 'admin_relatorio/naoformal_index'

  get 'admin_relatorio/update_particular'
  post 'admin_relatorio/update_particular'

  get 'admin_relatorio/update_publico'
  post 'admin_relatorio/update_publico'

  get 'admin_relatorio/update_centro'
  post 'admin_relatorio/update_centro'

  get 'admin_relatorio/update_guarus'
  post 'admin_relatorio/update_guarus'

  get 'admin_relatorio/update_naoformal'
  post 'admin_relatorio/update_naoformal'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  devise_for :users, controllers: { registrations: 'users/registrations' }
end
