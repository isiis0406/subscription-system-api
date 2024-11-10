import Joi from 'joi'


export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'admin'),
})