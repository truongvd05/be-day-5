const exceptionHandler = (err, _, res, next) => {
    res.error(500, err.message, err);
};

export default exceptionHandler;
