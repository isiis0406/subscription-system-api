import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient


const generateToken = (payload) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    return token
}

const handleResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data
    })
}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) return handleResponse(res, 404, "Wrong credentials")

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) return handleResponse(res, 404, "Wrong credentials")

        const token = generateToken({ userId: user.userId, email: user.email })
        const { password: _, ...userDetails } = user
        return handleResponse(res, 200, "Authenticated successfully", { user: userDetails, token })

    } catch (error) {
        next(error)
    }

}

export const register = async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            return handleResponse(res, 400, "User already exists")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })
        const token = generateToken({ userId: newUser.userId, email: newUser.email })
        const { password: _, ...userDetails } = newUser
        handleResponse(res, 201, "User created  successfully", { user: userDetails, token })
    } catch (error) {
        next(error)
    }
}
