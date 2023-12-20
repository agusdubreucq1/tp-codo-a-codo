const Categoria = require("../../models/categoria");

const categoriaController = {
  index: async (req, res) => {
    try{
        const categorias = await Categoria.findAll()
        res.render("admin/categorias/index",{ categorias: categorias});
    }catch(e){
        console.log(e)
        res.send("error al mostrar las categorias")
    }
  },
  getCreate: (req, res)=>{
    res.render("admin/categorias/create")
  },
  create: async ( req, res)=>{
    const {nombre} = req.body;
    try{
        await Categoria.create({nombre: nombre})
        res.redirect("/admin/categorias/")
    }catch(e){
        console.log(e)
        res.send("error al crear")
    }
  },

  getEdit: async (req, res) => {
    const { id } = req.params;
    try {
      const categoria = await Categoria.findOne({
        where: {
          id: id,
        },
      });
      res.render("admin/categorias/edit", {categoria: categoria});
    } catch (e) {
      res.send("error al editar");
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
      await Categoria.update(
        { nombre: nombre },
        {
          where: {
            id: id,
          },
        }
      );
      res.redirect("/admin/categorias");
    } catch (e) {
      res.send("error al editar");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await Categoria.destroy({
        where: {
          id: id,
        },
      });
      res.redirect("/admin/categorias");
    } catch (e) {
      res.send("error al eliminar");
    }
  },
};

module.exports = categoriaController
