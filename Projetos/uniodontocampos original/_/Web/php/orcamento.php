<?php
 
require_once('class.phpmailer.php');
    $razao = $_POST['razao'];
    $cnpj = $_POST['cnpj'];
    $celular = $_POST['celular'];
  $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $endereco = $_POST['endereco'];
  $funcionarios = $_POST['funcionarios'];
    $dependentes = $_POST['dependentes'];
    $mensagem = "<strong>Razão social:  </strong>".$razao;
    $mensagem .= "<br>  <strong>Cnpj: </strong>".$_POST['cnpj'];
    $mensagem .= "<br>  <strong>Email: </strong>".$_POST['email'];
    $mensagem .= "<br>  <strong>Telefone: </strong>".$_POST['telefone'];
    $mensagem .= "<br>  <strong>Celular: </strong>".$_POST['celular'];
  $mensagem .= "<br>  <strong>Número de funcionários: </strong>".$_POST['funcionarios'];
  $mensagem .= "<br>  <strong>Endereço: </strong>".$_POST['endereco'];
  $mensagem .= "<br>  <strong>Dependentes: </strong>".$_POST['dependentes'];
  
 
$mail = new PHPMailer();
$mail->IsSMTP(); // Define que a mensagem será SMTP
$mail->Port = 587;
$mail->Host = "smtp.uniodontocampos.com.br"; // Endereço do servidor SMTP
$mail->SMTPAuth = true; // Autenticação
$mail->Username = 'cadastro@uniodontocampos.com.br'; // Usuário do servidor SMTP
$mail->Password = 'uniodonto01'; // Senha da caixa postal utilizada
  
$mail->From = "cadastro@uniodontocampos.com.br"; 
$mail->FromName = "Cadastro";

$mail->AddAddress('cadastro@uniodontocampos.com.br', 'Pré Cadastro');
$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
$mail->CharSet = 'UTF-8';
$mail->Subject  = "Solicitação de Orçamento Uniodonto"; // Assunto da mensagem
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