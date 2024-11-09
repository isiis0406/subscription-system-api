
const handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        status: 500,
        message: err.message || 'Internal Server Error',
    });
}

export default handleError;