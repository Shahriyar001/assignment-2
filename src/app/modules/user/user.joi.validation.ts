import Joi from 'joi';

const fullNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Z][a-z]*$/),
  lastName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Za-z]+$/),
});

const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const orderValidationSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required().trim(),
  password: Joi.string().required(),
  fullName: fullNameValidationSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().required().email(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: addressValidationSchema.required(),
  orders: Joi.array().items(orderValidationSchema),
});

export default userValidationSchema;
