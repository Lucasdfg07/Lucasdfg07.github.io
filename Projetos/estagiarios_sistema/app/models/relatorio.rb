class Relatorio < ApplicationRecord
  validates :representado_por, :semestre, :ano,
  :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de, presence: true

  validates :matricula_aluno, presence: false
end
