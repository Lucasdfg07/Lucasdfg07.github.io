class Relatnaoformal < ApplicationRecord
  validates :denominada_estagio, :CNPJ_estagio, :rua_estagio, :bairro_estagio, :municipio_estagio,
  :estado_estagio, :cep_estagio, :telefone_estagio, :representado_por, :ano, :endereco, :numero,
  :bairro, :municipio, :estado, :periodo_de, :periodo_a, presence: true

  validates :matricula_aluno, :nome, :matricula_aluno, :periodo, :licenciatura, precense: false
end
