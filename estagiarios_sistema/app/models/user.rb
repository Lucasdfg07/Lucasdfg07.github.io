class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :matricula, :nome, :licenciatura, :periodo, presence: true
  validates :pdf_centro, :pdf_guarus, :pdf_outros, :status_impressao, presence: false

  enum role: [:Aluno, :Administrador]
  enum situacao: [:Revisar, :Aprovado, :Reprovado]


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

end
