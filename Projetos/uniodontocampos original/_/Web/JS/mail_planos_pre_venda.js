$(document).ready(function() {
  document.getElementById('faleconosco-form').addEventListener('submit', function () {
    var nome = document.getElementById('fPF_Nome');
    var email = document.getElementById('fPF_Email');
    var cpf = document.getElementById('fPF_CPF');
    var celular = document.getElementById('fPF_Celular');
    var telefone = document.getElementById('fPF_Telefone');
    var mae = document.getElementById('fPF_Mae');
    var pai = document.getElementById('fPF_Pai');
    var endereco = document.getElementById('fPF_Endereco');
    var dependentes = document.getElementById('fPF_Dependentes');
    
    document.getElementById("faleconosco-form").action = "mailto:gerencia@uniodontocampos.com.br?body=Nome: "+nome.value+"%0pf: "+cpf.value+"%0ATelefone: "+telefone.value+"%0ACelular: "+celular.value+"%0AMãe: "+mae.value+"%0APai: "+pai.value+"%0AEndereço: "+endereco.value+"%0ADependentes: "+dependentes.value;
    
          
  });
});