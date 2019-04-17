<?php

require_once('class.phpmailer.php');

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $assunto = $_POST['assunto'];
    $mensagem = $_POST['mensagem'];

    $corpo = "<strong>** Formulário Orçamento Intermediário**  </strong>";
    $corpo = "<strong>Nome:  </strong>".$nome;
    $corpo .= "<br>  <strong>Email: </strong>".$email;
    $corpo .= "<br>  <strong>Assunto: </strong>".$assunto;
    $corpo .= "<br>  <strong>Mensagem: </strong>".$mensagem;


$mail = new PHPMailer();
$mail->IsSMTP(); // Define que a mensagem será SMTP
$mail->Port = 587;
$mail->Host = "smtp.hostinger.com.br"; // Endereço do servidor SMTP
$mail->SMTPAuth = true; // Autenticação
$mail->Username = 'website@lucas-siqueira.com'; // Usuário do servidor SMTP
$mail->Password = 'lucas123'; // Senha da caixa postal utilizada

$mail->From = "website@lucas-siqueira.com";
$mail->FromName = "Web Site";

$mail->AddAddress('lucassiqueirafernandes07@gmail.com', 'lucasfernandes.com.br');
$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
$mail->CharSet = 'UTF-8';
$mail->Subject  = 'Formulário Intermediário - R$1.590,00'; // Assunto da mensagem
$mail->Body = $corpo;

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
