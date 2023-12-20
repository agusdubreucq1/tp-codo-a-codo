const { body } = require("express-validator");

const formValidations = [
  body("categoria").notEmpty().withMessage("Ingrese una categoria").bail(),
  body("licencia").notEmpty().withMessage("Ingrese una licencia").bail(),
  body("nombre").notEmpty().withMessage("ingrese un nombre").bail(),
  body("SKU").notEmpty().withMessage("Ingrese un SKU").bail(),
  body("precio").notEmpty().withMessage("ingrese un precio").bail(),
  body("stock").notEmpty().withMessage("ingrese un stock").bail(),
  body("descuento").notEmpty().withMessage("ingrese un descuento").bail(),
  body("cuotas").notEmpty().withMessage("ingrese unas cuotas").bail()
];

module.exports = { formValidations };
