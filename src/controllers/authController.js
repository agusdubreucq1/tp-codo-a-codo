const User = require("../models/user");
const { validationResult } = require("express-validator");
const bycript = require("bcryptjs");
const Categoria = require("../models/categoria");

const authController = {
  register: async (req, res) => {
    let logueado = (req.session?.userId ? true : false) ?? false;
    const categorias = await Categoria.findAll()
    res.render("auth/register", {categorias, logueado});
  },
  postRegister: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors)
      return res.render("auth/register", {
        errors: errors.array(),
        values: req.body,
      });
    }

    const { email, password, name, lastname  } = req.body;
    try {
      await User.create({ email, password, name, lastname });
      res.redirect("/login")
    } catch (e) {
      res.send(e);
    }
  },
  login: async (req, res) => {
    let logueado = (req.session?.userId ? true : false) ?? false;
    const categorias = await Categoria.findAll()
    res.render("auth/login", {categorias, logueado});
  },
  postLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      if(!user) {
        return res.send("Usuario no encontrado");
      }else if(!(await bycript.compare(password, user.password))) {
        return res.send("Contraseña incorrecta");
      }else{
        req.session.userId = user.id;
        res.redirect("/admin/products");
      }
    } catch (e) {
      res.send("Error al iniciar sesion");
    }
    
  },
  logout: (req, res)=>{
    req.session = null,
    res.redirect("/login")
  }
};

module.exports = authController;
