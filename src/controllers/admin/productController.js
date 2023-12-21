const Categoria = require("../../models/categoria");
const Licencia = require("../../models/licencia");
const Producto = require("../../models/producto");

// const sharp = require("sharp");
const path = require("path");
const fs = require("node:fs");
const { validationResult } = require("express-validator");

const productController = {
  index: async (req, res) => {
    try {
      const products = await Producto.findAll({
        include: [
          {
            model: Categoria,
            attributes: ["nombre"],
          },
        ],
      });
      res.render("admin/productos/index", { products: products });
    } catch (e) {
      console.log(e);
      res.send("error al mostrar productos");
    }
  },
  create: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      try {
        const categorias = await Categoria.findAll();
        const licencias = await Licencia.findAll();
        res.render("admin/productos/create", {
          categorias: categorias,
          licencias: licencias,
          errors: errors.array(),
          values: req.body
        });
      } catch (e) {
        console.log(e);
        res.send(e);
      }
      return;
    }

    const {
      nombre,
      descripcion,
      precio,
      categoria,
      SKU,
      descuento,
      stock,
      cuotas,
      licencia,
    } = req.body;
    try {
      const newProduct = await Producto.create({
        nombre,
        precio,
        CategoryId: categoria,
        LicenciumId: licencia,
        SKU,
        descuento,
        stock,
        cuotas,
        descripcion,
      });

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          const newPath = path.resolve(
                __dirname,
                `../../../public/img/productos/producto_${newProduct.id}_${
                  i > 0 ? "back" : "front"
                }.jpg`
              )
          // sharp(req.files[i].buffer)
          //   .resize(300)
          //   .toFile(newPath);
          fs.chmodSync(newPath, 0o777);
          fs.writeFileSync(newPath, req.files[i].buffer);
        }
        newProduct.update({
          imagen_front: `producto_${newProduct.id}_front.jpg`,
          imagen_back: `producto_${newProduct.id}_back.jpg`,
        });
      }
      res.redirect("/admin/products");
    } catch (e) {
      res.send("Error", e);
    }

  },

  getCreate: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      const licencias = await Licencia.findAll();
      res.render("admin/productos/create", {
        categorias: categorias,
        licencias: licencias,
      });
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getEdit: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Producto.findOne({
        include: [
          {
            model: Categoria,
          },
        ],
        where: {
          id: id,
        },
      });
      const categorias = await Categoria.findAll();
      const licencias = await Licencia.findAll();
      res.render("admin/productos/edit", {
        product: product,
        categorias: categorias,
        licencias: licencias,
      });
    } catch (e) {
      console.log(e);
      res.send("error al editar");
    }
  },
  edit: async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;

    if (!errors.isEmpty()) {
      try {
        const product = await Producto.findOne({
          include: [
            {
              model: Categoria,
            },
          ],
          where: {
            id: id,
          },
        });
        const categorias = await Categoria.findAll();
        const licencias = await Licencia.findAll();
        res.render("admin/productos/edit", {
          product: product,
          categorias: categorias,
          licencias: licencias,
          errors: errors.array(),
          values: req.body
        });
      } catch (e) {
        console.log(e);
        res.send("error al editar");
      }
      return;
    }

    
    const {
      nombre,
      precio,
      categoria,
      SKU,
      descuento,
      stock,
      cuotas,
      descripcion,
      licencia
    } = req.body;

    try {
      let product = await Producto.findOne({
        where:{
          id: id
        }
      })
       await product.update(
        {
          nombre: nombre,
          precio: precio,
          CategoryId: categoria,
          SKU: SKU,
          cuotas: cuotas,
          descuento: descuento,
          stock: stock,
          descripcion: descripcion,
          LicenciumId: licencia
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (req.files.length > 0) {
        if(product.imagen_front) {deleteImgIfExist(product.imagen_front)}
        if(product.imagen_back) {deleteImgIfExist(product.imagen_back)}

        for (let i = 0; i < req.files.length; i++) {
          const newPath = path.resolve(
                __dirname,
                `../../../public/img/productos/producto_${product.id}_${
                  i > 0 ? "back" : "front"
                }.jpg`
              )
          // sharp(req.files[i].buffer)
          //   .resize(300)
          //   .toFile(newPath);
          fs.chmodSync(newPath, 0o777);
          fs.writeFileSync(newPath, req.files[i].buffer);
        }
        product.update({
          imagen_front: `producto_${product.id}_front.jpg`,
          imagen_back: `producto_${product.id}_back.jpg`,
        });
      }
      res.redirect("/admin/products");
    } catch (e) {
      console.log(e);
      res.send("error al editar", e);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      let producto = await Producto.findOne({
        where:{
          id: id
        }
      });
      if(producto.imagen_front) {deleteImgIfExist(producto.imagen_front)}
      if(producto.imagen_back) {deleteImgIfExist(producto.imagen_back)}

      await producto.destroy()
      res.redirect("/admin/products");
    } catch (e) {
      res.send("no se pudo eliminar el producto");
    }
  },
};

function deleteImgIfExist(nameImage){
  fs.unlink(path.resolve(__dirname, `../../../public/img/productos/${nameImage}`), (error)=>{
    if(error) console.log("ocurrio un error al eliminar la imagen", error)
  })
}

module.exports = productController;
