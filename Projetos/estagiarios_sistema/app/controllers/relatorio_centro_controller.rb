class RelatorioCentroController < ApplicationController
  def index
    @relatorios = Relatorio.all

    if current_user.licenciatura == 'Ciências da Natureza'
      redirect_to action: "edit"
    end

    respond_to do |format|
     format.html
     format.pdf do
       @relatorio = Relatorio.all
       pdf = CentroPdf.new(@relatorio, current_user)
       send_data pdf.render, filename: 'relatorio.pdf', type: 'application/pdf', disposition: 'inline'
     end
    end
  end

  def update
    @relatorios = current_user.update(user_params)
    redirect_to relatorio_centro_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def create
    @relatorios = Relatorio.new(relatorio_params)

    @users = current_user.update(:pdf_centro => 'Preenchido')

    @relatorios.ano = '20'+@relatorios.ano
    @relatorios.matricula_aluno = current_user.matricula

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
    params.permit(:representado_por, :periodo, :semestre, :ano, :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de)
  end
end
