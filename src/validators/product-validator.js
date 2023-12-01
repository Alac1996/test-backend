const Joi = require("joi");

const checkProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  code: Joi.string().trim().required(),
  price: Joi.number().required(),
});

exports.checkProductSchema = checkProductSchema;
