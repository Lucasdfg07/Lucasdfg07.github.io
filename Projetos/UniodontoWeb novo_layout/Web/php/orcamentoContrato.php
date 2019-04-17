<?php
 
require_once('class.phpmailer.php');
    $nome = $_POST['nome'];
    $CPF = $_POST['CPF'];
    $carteirinha = $_POST['carteirinha'];

    $mensagem = "<strong>Nome:  </strong>".$nome;
    $mensagem .= "<br>  <strong>CPF: </strong>".$_POST['CPF'];
    $mensagem .= "<br>  <strong>Número da Carteirinha: </strong>".$_POST['carteirinha'];
  
 
$mail = new PHPMailer();
$mail->IsSMTP(); // Define que a mensagem será SMTP
$mail->Port = 587;
$mail->Host = "smtp.uniodontocampos.com.br"; // Endereço do servidor SMTP
$mail->SMTPAuth = true; // Autenticação
$mail->Username = 'cadastro@uniodontocampos.com.br'; // Usuário do servidor SMTP
$mail->Password = 'uniodonto01'; // Senha da caixa postal utilizada
  
$mail->From = "cadastro@uniodontocampos.com.br"; 
$mail->FromName = "Cadastro";

$mail->AddAddress('cadastro@uniodontocampos.com.br', 'Solicitação Contrato');
$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
$mail->CharSet = 'UTF-8';
$mail->Subject  = "Solicitação Contrato Uniodonto"; // Assunto da mensagem
$mail->Body = $mensagem;
  
$enviado = $mail->Send();
$mail->ClearAllRecipients();
$mail->ClearAttachments();
  
if ($enviado) {
echo "E-mail enviado com sucesso!";
} else {
echo "Não foi possível enviar o e-mail.
 
";
echo "Informações do erro: 
" . $mail->ErrorInfo;
}

?>