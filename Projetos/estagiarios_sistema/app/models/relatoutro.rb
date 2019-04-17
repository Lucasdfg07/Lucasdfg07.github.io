class Relatoutro < ApplicationRecord
  validates :parceria_firmada_com, :denominada_estagio, :CNPJ_estagio, :rua_estagio, :numero_estagio, :periodo_letivo,
  :bairro_estagio, :municipio_estagio, :telefone_estagio, :representado_por, :ano,
  :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de, presence: true

  validates :matricula_aluno, presence: false
end
