import Joi from 'joi';

export const productSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Başlıq ən az 3 simvol olmalıdır',
      'string.max': 'Başlıq ən çox 100 simvol ola bilər',
      'any.required': 'Başlıq tələb olunur'
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Təsvir ən az 10 simvol olmalıdır',
      'string.max': 'Təsvir ən çox 1000 simvol ola bilər',
      'any.required': 'Təsvir tələb olunur'
    }),

  price: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Qiymət rəqəm olmalıdır',
      'number.positive': 'Qiymət müsbət olmalıdır',
      'any.required': 'Qiymət tələb olunur'
    }),

  categoryId: Joi.string()
    .required()
    .messages({
      'any.required': 'Kateqoriya tələb olunur'
    }),

  imageUrls: Joi.string()
    .required()
    .messages({
      'any.required': 'Ən az bir şəkil tələb olunur'
    }),

  status: Joi.string()
    .valid('AVAILABLE', 'PENDING', 'SOLD', 'RESERVED')
    .default('AVAILABLE')
    .messages({
      'any.only': 'Yanlış status'
    }),

  isSponsored: Joi.boolean()
    .default(false)
});

export const validateProduct = (data) => {
  return productSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });
};