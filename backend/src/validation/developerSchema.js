const Joi = require('joi');

const developerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'any.required': 'Name is required'
    }),
  
  role: Joi.string()
    .valid('Frontend', 'Backend', 'Full-Stack', 'DevOps', 'Mobile')
    .required()
    .messages({
      'any.only': 'Invalid role selected',
      'any.required': 'Role is required'
    }),
  
  techStack: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().trim()).min(1),
      Joi.string().min(1)
    )
    .required()
    .messages({
      'any.required': 'Tech stack is required',
      'array.min': 'At least one technology is required'
    }),
  
  experience: Joi.number()
    .min(0)
    .max(50)
    .required()
    .messages({
      'number.min': 'Experience cannot be negative',
      'number.max': 'Experience seems too high',
      'any.required': 'Experience is required'
    }),
  
  about: Joi.string()
    .max(1000)
    .allow('')
    .messages({
      'string.max': 'About section cannot exceed 1000 characters'
    }),
  
  photoUrl: Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'Please enter a valid URL'
    }),
  
  joiningDate: Joi.date()
    .messages({
      'date.base': 'Invalid date format'
    })
});

module.exports = { developerSchema };