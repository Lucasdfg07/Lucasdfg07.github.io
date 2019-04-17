# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_10_185623) do

  create_table "relatorios", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "representado_por", default: "", null: false
    t.string "semestre", default: "", null: false
    t.string "ano", default: "", null: false
    t.string "endereco", default: "", null: false
    t.string "bairro", default: "", null: false
    t.string "municipio", default: "", null: false
    t.string "estado", default: "", null: false
    t.string "CEP", default: "", null: false
    t.string "periodo_de", default: "", null: false
    t.string "matricula_aluno"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "relatoutros", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "parceria_firmada_com"
    t.string "denominada_estagio"
    t.string "CNPJ_estagio"
    t.string "rua_estagio"
    t.string "numero_estagio"
    t.string "periodo_letivo"
    t.string "bairro_estagio"
    t.string "municipio_estagio"
    t.string "telefone_estagio"
    t.string "representado_por"
    t.string "ano"
    t.string "endereco"
    t.string "bairro"
    t.string "municipio"
    t.string "estado"
    t.string "CEP"
    t.string "periodo_de"
    t.string "matricula_aluno"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nome", null: false
    t.string "matricula", null: false
    t.string "licenciatura", null: false
    t.string "periodo", null: false
    t.integer "role", default: 0
    t.integer "situacao", default: 0
    t.string "pdf_centro", default: "0"
    t.string "pdf_guarus", default: "0"
    t.string "pdf_outros", default: "0"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
