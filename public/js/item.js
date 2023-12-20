let agregar = document.querySelector(".agregar");
let restar = document.querySelector(".restar");
let input = document.querySelector(".input_stock");

agregar.addEventListener("click", () => {
  let numero = input.value;
  numero = Number(numero);
  numero++;
  input.value = numero;
});

restar.addEventListener("click", () => {
  let numero = input.value;
  if (numero > 0) {
    numero = Number(numero);
    numero--;
    input.value = numero;
  }
});
