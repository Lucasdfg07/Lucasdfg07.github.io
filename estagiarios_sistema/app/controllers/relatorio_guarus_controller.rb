class RelatorioGuarusController < ApplicationController
  def index
    @relatorios = Relatorio.all

    if current_user.licenciatura == 'Ciências da Natureza'
      redirect_to action: "edit"
    end

    respond_to do |format|
     format.html
     format.pdf do
       @relatorio = Relatorio.all
       if current_user.role == "Administrador"
         @usuario_matricula = params['matricula']
       else
         @usuario_matricula = current_user.matricula
       end
       @users = current_user.update(:status_impressao => '1')
       pdf = GuarusPdf.new(@relatorio, current_user, @usuario_matricula)
       send_data pdf.render, filename: 'relatorio.pdf', type: 'application/pdf', disposition: 'inline'
       if current_user.role != "Administrador"
         ContactMailer.confirmacao_impressao(current_user).deliver
       end
     end
    end
  end

  def update
    @relatorios = current_user.update(user_params)
    redirect_to relatorio_guarus_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def create
    @relatorios = Relatorio.new(relatorio_params)

    @users = current_user.update(:pdf_guarus => 'Preenchido')

    @relatorios.ano = '20'+@relatorios.ano
    @relatorios.matricula_aluno = current_user.matricula
    @relatorios.nome = current_user.nome
    @relatorios.licenciatura = current_user.licenciatura
    @relatorios.periodo = current_user.periodo


    ContactMailer.contact_message(current_user).deliver


    flash[:notice] = 'Mensagem enviada com sucesso'

    if @relatorios.save
      redirect_to welcome_index_path, id: @relatorios.id,  notice: 'Relatório salvo com sucesso!'
    else
      redirect_to welcome_index_path, notice: 'Ocorreu um erro ao salvar o relatório, tente novamente mais tarde!'
    end
  end

  def user_params
    params.permit(:licenciatura)
  end

  def relatorio_params
    params.permit(:representado_por, :periodo, :semestre, :ano, :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a)
  end
end
