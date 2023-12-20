const Licencia = require("../models/licencia");
const Producto = require("../models/producto")



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
        const { min, max, categoria } = req.query;
        
        try{
            const products = await Producto.findAll({
                include: {
                    model: Licencia,
                }
            })
            let logueado = (req.session?.userId ? true : false) ?? false
            res.render("public/shop", {products: products, logueado});
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