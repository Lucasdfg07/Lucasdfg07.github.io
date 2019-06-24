class ContactMailer < ActionMailer::Base
  default :from => 'lucassiqueirafernandes07@gmail.com'

  def contact_message(current_user)
    @current_user = current_user
    # mail(:to => current_user.email, :subject => 'Mensagem de Contato')
    mail(:to => 'lucassiqueirafernandes07@gmail.com', :subject => 'Mensagem de Contato')
  end

  def confirmacao_impressao(current_user)
    @current_user = current_user
    # mail(:to => current_user.email, :subject => 'Mensagem de Contato')
    mail(:to => 'lucassiqueirafernandes07@gmail.com', :subject => 'Impressão de Formulário')
  end

end
