class Relatparticular < ApplicationRecord
  validates :denominada_estagio, :CNPJ_estagio, :rua_estagio, :numero_estagio, :bairro_estagio,
  :municipio_estagio, :estado_estagio, :cep_estagio, :telefone_estagio, :representado_por, :ano,
  :endereco, :numero, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a, presence: true

  validates :matricula_aluno, :nome, :matricula_aluno, :periodo, :licenciatura, presence: false
end
