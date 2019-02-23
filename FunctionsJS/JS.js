//fatorial
var i = prompt("Digite seu numero:");
var num = 0;

function fatorial(i) {
  while(num!=i){
  num = i *(i-1);
  return num;
  }
}

fatorial (i);
alert(num);


//par ou impar
var num = prompt('Digite um número:');

function par_impar(num) {
  if(num%2 == 1) {
    return "Ímpar";
  } else {
    return "Par";
  }
}

alert(par_impar(num));

//validar email
var valida = prompt('Digite seu Email:');
var email = new RegExp(/^\w*(\.\w*)?@[a-z].[a-z]+(\.[a-z]+)?$/);

function Email(email, valida) {
  if (email.test(valida)) {
    alert('Email Válido.');

  } else {

    alert('Email Inválido.');
  }
}

Email(email, valida);
