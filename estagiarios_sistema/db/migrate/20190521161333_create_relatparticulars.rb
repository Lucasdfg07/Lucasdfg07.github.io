class CreateRelatparticulars < ActiveRecord::Migration[5.2]
  def change
    create_table :relatparticulars do |t|
      t.string :denominada_estagio
      t.string :CNPJ_estagio
      t.string :rua_estagio
      t.string :numero_estagio
      t.string :bairro_estagio
      t.string :municipio_estagio
      t.string :estado_estagio
      t.string :cep_estagio
      t.string :telefone_estagio
      t.string :representado_por
      t.string :ano
      t.string :endereco
      t.string :numero
      t.string :bairro
      t.string :municipio
      t.string :estado
      t.string :CEP
      t.string :periodo_de
      t.string :periodo_a
      t.string :nome
      t.string :matricula_aluno
      t.string :periodo
      t.string :licenciatura
      t.timestamps
    end
  end
end
