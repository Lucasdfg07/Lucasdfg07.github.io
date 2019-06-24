class AdminRelatorioController < ApplicationController
  def particular_index
    @relatorios = Relatparticular.all

    @users = User.find(params[:id])

    session[:matricula_aluno] = @users.matricula
    session[:nome_aluno] = @users.nome
  end

  def publico_index
    @relatorios = Relatpublico.all

    @users = User.find(params[:id])

    session[:matricula_aluno] = @users.matricula
    session[:nome_aluno] = @users.nome
  end

  def centro_index
    @relatorios = Relatorio.all

    @users = User.find(params[:id])

    session[:matricula_aluno] = @users.matricula
    session[:nome_aluno] = @users.nome
  end

  def guarus_index
    @relatorios = Relatorio.all

    @users = User.find(params[:id])

    session[:matricula_aluno] = @users.matricula
    session[:nome_aluno] = @users.nome
  end

  def naoformal_index
    @relatorios = Relatnaoformal.all

    @users = User.find(params[:id])

    session[:matricula_aluno] = @users.matricula
    session[:nome_aluno] = @users.nome
  end

  def update_particular
    @relatorios = Relatparticular.where("matricula_aluno = "+ session[:matricula]+" && nome = '"+ session[:nome_aluno]+"'").update(relatorio_particular_params)
    redirect_to welcome_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def update_publico
    @relatorios = Relatpublico.where("matricula_aluno = "+ session[:matricula_aluno]+" && nome = '"+ session[:nome_aluno]+"'").update(relatorio_publico_params)
    redirect_to welcome_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def update_centro
    @relatorios = Relatorio.where("matricula_aluno = "+ session[:matricula_aluno]+" && nome = '"+ session[:nome_aluno]+"'").update(relatorio_centro_params)
    redirect_to welcome_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def update_guarus
    @relatorios = Relatorio.where("matricula_aluno = "+ session[:matricula_aluno]+" && nome = '"+ session[:nome_aluno]+"'").update(relatorio_guarus_params)
    redirect_to welcome_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def update_naoformal
    @relatorios = Relatnaoformal.where("matricula_aluno = "+ session[:matricula_aluno]+" && nome = '"+ session[:nome_aluno]+"'").update(relatorio_naoformal_params)
    redirect_to welcome_index_path, notice: 'Dados Atualizados com sucesso!'
  end

  def relatorio_particular_params
    params.permit(:denominada_estagio, :CNPJ_estagio, :rua_estagio, :numero_estagio, :bairro_estagio, :municipio_estagio, :estado_estagio, :cep_estagio, :telefone_estagio, :representado_por, :ano, :endereco, :numero, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a)
  end

  def relatorio_publico_params
    params.permit(:parceria_firmada_com, :denominada_estagio, :CNPJ_estagio, :rua_estagio, :numero_estagio, :periodo_letivo, :bairro_estagio, :municipio_estagio, :telefone_estagio, :representado_por, :ano, :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a)
  end

  def relatorio_centro_params
    params.permit(:representado_por, :periodo, :semestre, :ano, :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a)
  end

  def relatorio_guarus_params
    params.permit(:representado_por, :periodo, :semestre, :ano, :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a)
  end

  def relatorio_naoformal_params
    params.permit(:denominada_estagio, :CNPJ_estagio, :rua_estagio, :bairro_estagio, :municipio_estagio, :estado_estagio, :cep_estagio, :telefone_estagio, :representado_por, :ano, :endereco, :numero, :bairro, :municipio, :estado, :periodo_de, :periodo_a)
  end
end
