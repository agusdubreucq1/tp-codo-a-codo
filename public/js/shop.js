let btn_filtrar = document.querySelector(".btn-filtros-responsive");
let filtros = document.querySelector(".shop_buscador");


btn_filtrar.addEventListener("click", () => {
    filtros.classList.toggle("show_filtros");
    
})