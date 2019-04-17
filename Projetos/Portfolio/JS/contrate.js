$('#modal-orcamento-basico').hide();
$('#modal-orcamento-intermediario').hide();
$('#modal-orcamento-iniciante').hide();
$('#modal-orcamento-avancado').hide();


function contrateAquiBasico() {
  document.getElementById("modal-orcamento-basico").style.animation = "modal-orcamento-basico 2s forwards";


  $('#modal-orcamento-basico').show();

  $('#modal-orcamento-basico').on('mouseleave', function(){
    $(this).slideUp();
  });

}

function contrateAquiIniciante() {
  document.getElementById("modal-orcamento-iniciante").style.animation = "modal-orcamento-basico 2s forwards";

  $('#modal-orcamento-iniciante').show();

  $('#modal-orcamento-iniciante').on('mouseleave', function(){
    $(this).slideUp();
  });
}

function contrateAquiIntermediario() {
  document.getElementById("modal-orcamento-intermediario").style.animation = "modal-orcamento-basico 2s forwards";

  $('#modal-orcamento-intermediario').show();

  $('#modal-orcamento-intermediario').on('mouseleave', function(){
    $(this).slideUp();
  });
}

function contrateAquiAvancado() {
  document.getElementById("modal-orcamento-avancado").style.animation = "modal-orcamento-basico 2s forwards";

  $('#modal-orcamento-avancado').show();

  $('#modal-orcamento-avancado').on('mouseleave', function(){
    $(this).slideUp();
  });
}
