const Licencia = require("../models/licencia");
const Producto = require("../models/producto")

const VALORES_ORDENAR ={
    MAYOR_A_MENOR:"mayor-menor",
    MENOR_A_MAYOR:"menor-mayor",
    ALFABETICO:"alfabetico",
}



const mainController = {
    index: (req, res)=>{
        res.redirect('/home')
    },

    home: async (req, res)=> {
        try{
            const products = await Producto.findAll({
                include: {
                    model: Licencia,
                }
            })
            let logueado = (req.session?.userId ? true : false) ?? false;
            res.render("index", {products: products, logueado});
        }catch(e){
            console.log(e)
            res.sendStatus(500).send(e)
        }
    },

    shop: async (req, res)=>{
        const { preciomin, preciomax, buscar , ordenar} = req.query;
        
        try{
            let products = await Producto.findAll({
                include: {
                    model: Licencia,
                }
            })
            let logueado = (req.session?.userId ? true : false) ?? false

            if(preciomin && preciomin > 0){
                products = products.filter(producto => producto.precio >= preciomin)
            }
            if(preciomax && preciomax > 0){
                products = products.filter(producto => producto.precio <= preciomax)
            }
            if(buscar && buscar.length > 0){
                products = products.filter(producto => producto.nombre.toLowerCase().includes(buscar.toLowerCase()))
            }
            if(ordenar){
                switch(ordenar){
                    case VALORES_ORDENAR.MAYOR_A_MENOR:
                        products.sort((a, b) => b.precio - a.precio)
                        break;
                    case VALORES_ORDENAR.MENOR_A_MAYOR:
                        products.sort((a, b) => a.precio - b.precio)
                        break;
                    case VALORES_ORDENAR.ALFABETICO:
                        products.sort((a, b) => a.nombre.localeCompare(b.nombre))
                        break;
                }
            }

            let filtros = {
                preciomin: preciomin,
                preciomax: preciomax,
                buscar: buscar,
                ordenar: ordenar
            }

            res.render("public/shop", {products: products, logueado, filtros: req.query});
        }catch(e){
            console.log(e)
            res.sendStatus(500).send(e)
        }
    },

    item: async (req, res)=>{
        let {id} = req.params;
        id = Number(id)
        try{
            const products = await Producto.findAll({
                include:{
                    model: Licencia
                }
            })
            const product = products.find(producto=> producto.id === id);
            let logueado = (req.session?.userId ? true : false) ?? false;
            res.render("public/item", {product: product, products: products, logueado})

        }catch(e){
            console.log(e)
            res.sendStatus(500).send(e)
        }

    },


    contact: (req, res)=> res.send("contact"),
    about: (req, res)=>res.send("about"),
    faqs: (req, res)=>res.send("faqs"),

    cart: (req, res)=>{
        let logueado = (req.session?.userId ? true : false) ?? false;
        res.render("public/cart", {logueado})
    }
}

module.exports = mainController