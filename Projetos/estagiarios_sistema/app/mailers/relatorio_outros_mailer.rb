class RelatorioOutrosMailer < ActionMailer::Base
  default :from => 'lucassiqueirafernandes07@gmail.com'

  def contact_message(relatoutro, current_user)
    @relatoutro = relatoutro
    @current_user = current_user

    mail(:to => current_user.email, :subject => 'Mensagem de Contato')
  end
end
