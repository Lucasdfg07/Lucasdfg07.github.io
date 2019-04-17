class WelcomeController < ApplicationController
  def index
    @users = User.order(situacao: :ASC)
  end

  def edit
    session[:id_user] = params['id']
    session[:nome_user] = params['nome']

    @values_situacao = ["Revisar", "Aprovado", "Reprovado"]
  end

  def update
    @id_user = session[:id_user]

    User.where(id: @id_user).update(situacao_params)

    redirect_to welcome_index_path, notice: 'Usuário atualizado com sucesso!'
  end

  def show
  end

  def situacao_params
    params.permit(:situacao)
  end
end
