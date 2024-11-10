import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient



const handleResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data
    })
}
export const getAuthenticatedUser = async (req, res, next) => {
    const { userId } = req.user;
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId
            }
        })
        if (!user) return handleResponse(res, 404, "User not found")

        const { password: _, ...userDetails } = user
        return handleResponse(res, 200, "User fetched successfully", { user: userDetails })

    } catch (error) {
        next(error)
    }

}

export const getUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId
            }
        })
        if (!user) return handleResponse(res, 404, "User not found")

        const { password: _, ...userDetails } = user
        return handleResponse(res, 200, "User fetched successfully", { user: userDetails })
    } catch (error) {
        next(error)
    }
}
export const updateUser = async (req, res, next) => {
    const { email, name, role } = req.body;
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId
            }
        })
        if (!user) {
            return handleResponse(res, 404, "User not found")
        }

        //Verify if a user with the email already exists
        const userWithEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (userWithEmail && userWithEmail.userId !== userId) {
            return handleResponse(res, 409, "User with email already exists")
        }

        const updatedUser = await prisma.user.update({
            where: {
                userId
            },
            data: {
                email,
                name,
                role
            }
        })
        const { password: _, ...userDetails } = updatedUser
        return handleResponse(res, 200, "User updated successfully", { user: userDetails })
    } catch (error) {
        next(error)
    }
}
