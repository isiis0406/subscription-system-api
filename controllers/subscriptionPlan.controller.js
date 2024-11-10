import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient



const handleResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data
    })
}
export const getSubscriptionPlans = async (req, res, next) => {
    try {
        const subscriptionPlans = await prisma.subscriptionPlan.findMany()

        return handleResponse(res, 200, "Subscription plans fetched successfully", subscriptionPlans)

    } catch (error) {
        next(error)
    }

}

export const createSubscriptionPlan = async (req, res, next) => {
    const { planName, price, description, level } = req.body;
    try {
        const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
            where: {
                planName
            }
        })
        if (subscriptionPlan) return handleResponse(res, 409, "Subscription plan already exists")

        const newSubscriptionPlan = await prisma.subscriptionPlan.create({
            data: {
                planName,
                price,
                description,
                level
            }
        })
        return handleResponse(res, 201, "Subscription plan created successfully", newSubscriptionPlan)
    } catch (error) {
        next(error)
    }
}


export const updateSubscriptionPlan = async (req, res, next) => {
    const { planName, price, description, level } = req.body;
    const { planId } = req.params;
    try {
        const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
            where: {
                planId
            }
        })
        if (!subscriptionPlan) return handleResponse(res, 404, "Subscription plan not found")

        //Verify if a subscriptionPlan with the name already exists
        const planWithSameName = await prisma.subscriptionPlan.findUnique({
            where: {
                planName
            }
        })
        if (planWithSameName && planWithSameName.planId !== planId) {
            return handleResponse(res, 409, "Subscription plan with same name already exists")
        }

        const updatedSubscriptionPlan = await prisma.subscriptionPlan.update({
            where: {
                planId
            },
            data: {
                planName,
                price,
                description,
                level
            }
        })
        return handleResponse(res, 200, "Subscription plan updated successfully", updatedSubscriptionPlan)
    } catch (error) {
        next(error)
    }

}

export const deleteSubscriptionPlan = async (req, res, next) => {
    const { planId } = req.params;
    try {
        const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
            where: {
                planId
            }
        })
        if (!subscriptionPlan) return handleResponse(res, 404, "Subscription plan not found")

        await prisma.subscriptionPlan.delete({
            where: {
                planId
            }
        })
        return handleResponse(res, 200, "Subscription plan deleted successfully")
    } catch (error) {
        next(error)
    }
}