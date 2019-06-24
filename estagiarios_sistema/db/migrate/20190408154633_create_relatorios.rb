class CreateRelatorios < ActiveRecord::Migration[5.2]
  def change
    create_table :relatorios do |t|
      t.string :representado_por, null: false, default: ""
      t.string :semestre, null: false, default: ""
      t.string :ano, null: false, default: ""
      t.string :endereco, null: false, default: ""
      t.string :bairro, null: false, default: ""
      t.string :municipio, null: false, default: ""
      t.string :estado, null: false, default: ""
      t.string :CEP, null: false, default: ""
      t.string :periodo_de, null: false, default: ""
      t.string :periodo_a, null: false, default: ""
      t.string :nome
      t.string :matricula_aluno
      t.string :periodo
      t.string :licenciatura
      t.timestamps
    end
  end
end
