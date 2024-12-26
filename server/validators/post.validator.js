import Joi from 'joi';

export const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    price: Joi.number().positive().required(),
    images: Joi.array().items(Joi.string().uri()).required()
  });

  return schema.validate(data);
};