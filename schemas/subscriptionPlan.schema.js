import Joi from 'joi'


export const subscriptionPlanSchema = Joi.object({
    planName: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    level: Joi.number().required().min(0)
})