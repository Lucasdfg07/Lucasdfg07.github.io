<?php
 
require_once('class.phpmailer.php');
  
    $cpf = $_POST['cpf'];
    $telefone = $_POST['celular'];
    $email = $_POST['email'];
    $mae = $_POST['mae'];
  $pai = $_POST['pai'];
    $nome = $_POST['nome'];
  $endereco = $_POST['endereco'];
  $dependentes = $_POST['dependentes'];
    $mensagem = "<strong>Nome:  </strong>".$nome;
    $mensagem .= "<br>  <strong>Cpf: </strong>".$_POST['cpf'];
    $mensagem .= "<br>  <strong>Email: </strong>".$_POST['email'];
    $mensagem .= "<br>  <strong>Telefone: </strong>".$_POST['celular'];
    $mensagem .= "<br>  <strong>Pai: </strong>".$_POST['pai'];
  $mensagem .= "<br>  <strong>Mae: </strong>".$_POST['mae'];
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
$mail->Subject  = "Pré Cadastro Uniodonto"; // Assunto da mensagem
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