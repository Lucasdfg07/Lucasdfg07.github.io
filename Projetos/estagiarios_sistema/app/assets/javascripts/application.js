// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require bootstrap
//= require_tree .
$(document).ready(function() {
  $('.clausulas').hide();
  $('.conteudo').show();

  $('.avancar').click(function() {
    $('.clausulas').show(800);
    $('.clausulas_conteudo').show(800);
    $('.clausulas_conteudo').css("background-color", "rgba(10,10,10,0.6)");
  });

  $('.cancelar').click(function() {
    $('.clausulas').hide(800);
    $('.clausulas_conteudo').hide(800);
  });

  $('.btn_federal').mouseover(function() {
      $('.div_federal').slideDown();
  });

  $('.botoes').mouseleave(function() {
    $('.div_federal').slideUp();
  });
});
