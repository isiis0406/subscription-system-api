
const adminAuthorized = (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") return res.status(403).json({ status: 403, message: "Forbidden" });
    next();
}


export default adminAuthorized;