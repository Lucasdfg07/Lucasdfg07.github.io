class RelatorioParticularController < ApplicationController
  def index
    @relatorios = Relatparticular.all

    if current_user.licenciatura == 'Ciências da Natureza'
      redirect_to action: "edit"
    end

    respond_to do |format|
     format.html
     format.pdf do
       @relatorio = Relatparticular.all
       if current_user.role == "Administrador"
         @usuario_matricula = params['matricula']
       else
         @usuario_matricula = current_user.matricula
       end
       @users = current_user.update(:status_impressao => '1')
       pdf = ParticularPdf.new(@relatorio, current_user, @usuario_matricula)
       send_data pdf.render, filename: 'relatorio.pdf', type: 'application/pdf', disposition: 'inline'

       if current_user.role != "Administrador"
         ContactMailer.confirmacao_impressao(current_user).deliver
       end
     end
    end
  end

  def update
    @relatorios = current_user.update(user_params)
    redirect_to relatorio_centro_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def create
    @relatorios = Relatparticular.new(relatorio_params)

    @users = current_user.update(:pdf_particular => 'Preenchido')

    @relatorios.ano = '20'+@relatorios.ano
    @relatorios.matricula_aluno = current_user.matricula
    @relatorios.nome = current_user.nome
    @relatorios.licenciatura = current_user.licenciatura
    @relatorios.periodo = current_user.periodo

    if @relatorios.save
      @relatoutro = Relatparticular.last
      
      ContactMailer.contact_message(current_user).deliver

      flash[:notice] = 'Mensagem enviada com sucesso'
      redirect_to welcome_index_path, id: @relatorios.id,  notice: 'Relatório salvo com sucesso!'
    else
      redirect_to welcome_index_path, notice: 'Ocorreu um erro ao salvar o relatório, tente novamente mais tarde!'
    end
  end

  def status_impressao
    current_user.status_impressao = '1'
  end

  def user_params
    params.permit(:licenciatura)
  end

  def relatorio_params
    params.permit(:denominada_estagio, :CNPJ_estagio, :rua_estagio, :numero_estagio, :bairro_estagio, :municipio_estagio, :estado_estagio, :cep_estagio, :telefone_estagio, :representado_por, :ano, :endereco, :numero, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a)
  end
end
