function conteudo_1() {
  //captura a div de texto
  var conteudo_1 = document.getElementById('conteudo_1');
  var link1 = document.getElementById("enlace_1");

  //se display for = none, apaga os displays. Senão, define como none
  conteudo_1.style.display = conteudo_1.style.display === 'none' ? '' : 'none';
  //
  link1.innerHTML = link1.innerHTML === 'Ocultar Conteúdo' ? 'Mostrar Conteúdo' : 'Ocultar Conteúdo';
}

function conteudo_2() {
    var conteudo_2 = document.getElementById('conteudo_2');
    var link2 = document.getElementById("enlace_2");
    conteudo_2.style.display = conteudo_2.style.display === 'none' ? '' : 'none';

    link2.innerHTML = link2.innerHTML === 'Ocultar Conteúdo' ? 'Mostrar Conteúdo' : 'Ocultar Conteúdo';
}

function conteudo_3() {
    var conteudo_3 = document.getElementById('conteudo_3');
    var link3 = document.getElementById("enlace_3");
    conteudo_3.style.display = conteudo_3.style.display === 'none' ? '' : 'none';
    
    link3.innerHTML = link3.innerHTML === 'Ocultar Conteúdo' ? 'Mostrar Conteúdo' : 'Ocultar Conteúdo';
}
