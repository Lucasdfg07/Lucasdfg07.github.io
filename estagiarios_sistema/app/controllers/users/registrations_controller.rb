# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  def after_sign_up_path_for(resource)
      @users = User.create(user_params_create)

      signed_in_root_path(resource)
  end

  def update
    @users = current_user.update(user_params)
    redirect_to welcome_index_path, notice: 'Dados Atualizados com sucesso!'
  end


  def user_params_create
    params.require(:user).permit(:nome, :matricula, :licenciatura, :periodo, :email, :password, :password_confirmation)
  end

  def user_params
    params.require(:user).permit(:nome, :matricula, :email)
  end

  # If you have extra params to permit, append them to the sanitizer.
   def configure_sign_up_params
     devise_parameter_sanitizer.permit(:sign_up, keys: [:nome])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:matricula])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:licenciatura])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:periodo])
   end

   # If you have extra params to permit, append them to the sanitizer.
    def configure_account_update_params
      devise_parameter_sanitizer.permit(:account_update, keys: [:nome])
      devise_parameter_sanitizer.permit(:account_update, keys: [:matricula])
    end
end
