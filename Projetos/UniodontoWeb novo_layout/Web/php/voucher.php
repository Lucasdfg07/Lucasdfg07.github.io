<?php
 
require_once('class.phpmailer.php');
    $CPF1 = $_POST['CPF1'];
    $CPF2 = $_POST['CPF2'];
    $nome1 = $_POST['nome1'];
  $nome2 = $_POST['nome2'];
    
    $mensagem = "<strong>Nome do cliente indicado:  </strong>".$nome2;
    $mensagem .= "<br>  <strong>CPF do cliente indicado: </strong>".$_POST['CPF2'];
    $mensagem .= "<br><br>  <strong>Nome do cliente que indicou: </strong>".$_POST['nome1'];
    $mensagem .= "<br>  <strong>CPF do cliente que indicou: </strong>".$_POST['CPF1'];
  
 
$mail = new PHPMailer();
$mail->IsSMTP(); // Define que a mensagem será SMTP
$mail->Port = 587;
$mail->Host = "smtp.uniodontocampos.com.br"; // Endereço do servidor SMTP
$mail->SMTPAuth = true; // Autenticação
$mail->Username = 'cadastro@uniodontocampos.com.br'; // Usuário do servidor SMTP
$mail->Password = 'uniodonto01'; // Senha da caixa postal utilizada
  
$mail->From = "cadastro@uniodontocampos.com.br"; 
$mail->FromName = "Cadastro";

$mail->AddAddress('cadastro@uniodontocampos.com.br', 'Indicação Uniodonto');
$mail->CharSet = 'UTF-8';
$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
$mail->Subject  = "Indicação de clientes Uniodonto"; // Assunto da mensagem
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