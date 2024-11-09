
const logHandler = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
}

export default logHandler;