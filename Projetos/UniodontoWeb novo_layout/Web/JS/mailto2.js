$(document).ready(function() {
	document.getElementById('contatoForm').addEventListener('submit', function () {
		var nome = document.getElementById('fNome');
		var assunto_email = document.getElementById('fAssunto').value;
		var carteirinha = document.getElementById('fCarteirinha');
		var email = document.getElementById('fEmail');
		var telefone = document.getElementById('fTelefone');
		var corpo = document.getElementById('fMsg');
		
		document.getElementById("contatoForm").action = "mailto:"+assunto_email+"?body=Nome: "+nome.value+"%0ANúmero da Carteirinha: "+carteirinha.value+"%0ATelefone: "+telefone.value+"%0A %0A"+corpo.value;
		
					
	});
});