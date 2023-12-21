require("dotenv").config();

const serverless = require('serverless-http');

const express = require("express")
const path = require("path")
const mainRoutes = require("./src/routes/mainRoutes");
const authRoute = require('./src/routes/authRoutes');
const productRoute = require('./src/routes/admin/productRoutes');
const categoriaRoute = require('./src/routes/admin/categoriaRoutes');

const sequelize  = require("./src/models/conexion");

const session = require('cookie-session')
const method_override = require("method-override")


const isLogin = (req, res, next)=>{
    if(req.session.userId){
        next()
    }else{
        res.redirect('/login')
    }
}


const app = express()

app.use(method_override("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    keys: ['dhcndjscn', 'jdxnjdsbsjh']
}))
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs')
let carpeta_views = path.join(__dirname, '/src/views')
app.set('views', carpeta_views)

app.use('/', authRoute)
app.use('/', mainRoutes)

app.use('/admin/products',isLogin, productRoute)
app.use('/admin/categorias', isLogin, categoriaRoute)

app.use("*", (req, res)=>{
    res.send({
        error: -2,
        description: `Ruta ${req.originalUrl} método ${req.method} no implementada`
    })
})


const PORT = process.env.PORT || 3000

// app.listen(PORT, async ()=>{
//     try{
//         await sequelize.sync();
//     }catch(e){
//         console.log('error de conexion a la db: ', e)
//     }
//     console.log(`Escuchando en el puerto ${PORT}: http://localhost:${PORT}`)
// })

module.exports.handler = serverless(app, {
    callback: async () => {
      try {
        await sequelize.sync();
      } catch (e) {
        console.log('error de conexion a la db: ', e)
      }
      console.log('Aplicación lista')
    }
  });