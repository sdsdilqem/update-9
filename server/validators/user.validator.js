import Joi from 'joi';

export const userProfileSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': 'İstifadəçi adı ən az 3 simvol olmalıdır',
      'string.max': 'İstifadəçi adı ən çox 30 simvol ola bilər',
      'any.required': 'İstifadəçi adı tələb olunur'
    }),

  avatar: Joi.string()
    .uri()
    .allow(null, '')
    .messages({
      'string.uri': 'Düzgün şəkil URL-i daxil edin'
    })
});

export const validateUserProfile = (data) => {
  return userProfileSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });
};