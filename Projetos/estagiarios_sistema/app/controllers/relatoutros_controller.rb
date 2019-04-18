class RelatoutrosController < ApplicationController
  def index
    @relatorios = Relatoutro.all

    if current_user.licenciatura == 'Ciências da Natureza'
      redirect_to action: "edit"
    end

    respond_to do |format|
     format.html
     format.pdf do
       @relatorio = Relatoutro.all
       pdf = OutrosPdf.new(@relatorio, current_user)
       send_data pdf.render, filename: 'relatorio.pdf', type: 'application/pdf', disposition: 'inline'
     end
    end
  end

  def update
    @relatorios = current_user.update(user_params)
    redirect_to relatorio_centro_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def create
    @relatorios = Relatoutro.new(relatorio_params)

    @users = current_user.update(:pdf_outros => 'Preenchido')

    @relatorios.ano = '20'+@relatorios.ano
    @relatorios.matricula_aluno = current_user.matricula

    @relatoutro = Relatoutro.last

    if @relatorios.save
      redirect_to welcome_index_path, id: @relatorios.id,  notice: 'Relatório salvo com sucesso!'
      RelatorioOutrosMailer.contact_message(@relatoutro, current_user).deliver
      flash[:notice] = 'Mensagem enviada com sucesso'
    else
      redirect_to welcome_index_path, notice: 'Ocorreu um erro ao salvar o relatório, tente novamente mais tarde!'
    end
  end

  def user_params
    params.permit(:licenciatura)
  end

  def relatorio_params
    params.permit(:parceria_firmada_com, :denominada_estagio, :CNPJ_estagio, :rua_estagio, :numero_estagio, :periodo_letivo, :bairro_estagio, :municipio_estagio, :telefone_estagio, :representado_por, :ano, :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de)
  end
end
