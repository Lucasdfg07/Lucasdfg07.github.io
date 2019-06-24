class WelcomeController < ApplicationController
  def index
    @users = User.all
    @users = User.order(nome: :ASC).where("nome LIKE :search OR matricula LIKE :search OR licenciatura LIKE :search OR periodo LIKE :search OR email LIKE :search", search: "%#{params[:search]}%").paginate(page: params[:page], per_page: 10)
    if @users.exists?
    else
      @users = User.order(nome: :ASC).where("nome LIKE :search OR matricula LIKE :search OR licenciatura LIKE :search OR periodo LIKE :search OR email LIKE :search", search: "%#{params[:search]}%".titleize).paginate(page: params[:page], per_page: 10)
      if @users.exists?
      else
        @users = User.order(nome: :ASC).where("nome LIKE :search OR matricula LIKE :search OR licenciatura LIKE :search OR periodo LIKE :search OR email LIKE :search", search: "%#{params[:search]}%".titleize).paginate(page: params[:page], per_page: 10)
      end
    end
  end

  def edit
    session[:id_user] = params['id']
    session[:nome_user] = params['nome']
    session[:matricula_user] = params['matricula']
    session[:curso_user] = params['curso']
    session[:periodo_user] = params['periodo']
    session[:email_user] = params['email']

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
