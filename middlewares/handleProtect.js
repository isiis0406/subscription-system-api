import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const protect = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ status: 403, message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ status: 403, message: "Unauthorized" });

        const user = await prisma.user.findUnique({ where: { userId: decoded.userId } });
        if (!user) return res.status(403).json({ status: 403, message: "Unauthorized" });

        req.user = user;
        next();
    });
};

export default protect;