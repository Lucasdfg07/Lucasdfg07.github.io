$(document).ready(function() {
  document.getElementById('faleconosco-form').addEventListener('submit', function () {
    var razao = document.getElementById('fPJ_Nome');
    var email = document.getElementById('fPJ_Email');
    var cnpj = document.getElementById('fPJ_CNPJ');
    var celular = document.getElementById('fPJ_Celular');
    var telefone = document.getElementById('fPJ_Telefone');
    var endereco = document.getElementById('fPJ_Endereco');
    var funcionarios = document.getElementById('fPJ_Funcionarios');
    var dependentes = document.getElementById('fPJ_Dependentes');
    
    document.getElementById("faleconosco-form").action = "mailto:gerencia@uniodontocampos.com.br?body=Razão Social: "+razao.value+"%0ACNPJ: "+cnpj.value+"%0ATelefone: "+telefone.value+"%0ACelular: "+celular.value+"%0AEndereço: "+endereco.value+"%0ANúmero de funcionários: "+funcionarios.value+"%0APossui dependentes: "+dependentes.value;
    
          
  });
});