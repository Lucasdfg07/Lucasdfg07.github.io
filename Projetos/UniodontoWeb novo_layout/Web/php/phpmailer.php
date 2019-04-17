<?php
 
require_once('class.phpmailer.php');
  
    $carteirinha = $_POST['carteirinha'];
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $para = $_POST['email_destino'];
    $nome = $_POST['nome'];
    $mensagem = "<strong>Nome:  </strong>".$nome;
    $mensagem .= "<br>  <strong>Carteirinha: </strong>".$_POST['carteirinha'];
    $mensagem .= "<br>  <strong>Email: </strong>".$_POST['email'];
    $mensagem .= "<br>  <strong>Telefone: </strong>".$_POST['telefone'];
    $mensagem .= "<br>  <strong>Mensagem: </strong>".$_POST['mensagem'];
  
 
$mail = new PHPMailer();
$mail->IsSMTP(); // Define que a mensagem será SMTP
$mail->Port = 587;
$mail->Host = "smtp.uniodontocampos.com.br"; // Endereço do servidor SMTP
$mail->SMTPAuth = true; // Autenticação
$mail->Username = 'cadastro@uniodontocampos.com.br'; // Usuário do servidor SMTP
$mail->Password = 'uniodonto01'; // Senha da caixa postal utilizada
  
$mail->From = "cadastro@uniodontocampos.com.br"; 
$mail->FromName = "cadastro";

$mail->AddAddress($para, 'Uniodonto Email');
$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
$mail->CharSet = 'UTF-8';
$mail->Subject  = 'Pré Cadastro Uniodonto'; // Assunto da mensagem
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