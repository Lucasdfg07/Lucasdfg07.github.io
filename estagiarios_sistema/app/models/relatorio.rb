class Relatorio < ApplicationRecord
  validates :representado_por, :semestre, :ano,
  :endereco, :bairro, :municipio, :estado, :CEP, :periodo_de, :periodo_a, presence: true

  validates :matricula_aluno, :nome, :matricula_aluno, :periodo, :licenciatura, presence: false
end
