let btnes_borrar = document.querySelectorAll(".btn_borrar");
let modal = document.querySelector(".modal-delete");
let btn_cancelar = document.querySelector(".btn_cancelar");



btnes_borrar.forEach((btn) => btn.addEventListener("click", (e) => {
    let id_product = btn.getAttribute("product");
    console.log(id_product)
    modal.setAttribute("action", "/admin/products/" + id_product + "?_method=DELETE"); //action="/admin/products/<%= product.id %>?_method=DELETE"
    modal.classList.add("show");
}));

btn_cancelar.addEventListener("click", (e) => {
    modal.removeAttribute("action");
    modal.classList.remove("show");
})