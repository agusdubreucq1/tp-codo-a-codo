let btn_filtrar = document.querySelector(".btn-filtros-responsive");
let filtros = document.querySelector(".shop_buscador");

console.log(btn_filtrar, filtros)

btn_filtrar.addEventListener("click", () => {
    console.log("click")
    filtros.classList.toggle("show_filtros");
    
})