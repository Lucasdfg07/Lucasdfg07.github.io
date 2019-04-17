
  var i = setInterval(function () {

      clearInterval(i);

      // O código desejado é apenas isto:
      document.getElementById("loading").style.display = "none";
      document.getElementById("conteudo").style.display = "inline";

  }, 3000);

  $('.carousel').carousel({
  interval: 4000
  });
