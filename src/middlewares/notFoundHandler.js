const notFoundHandler = (_, res) => {
    return res.error(404, "Resource not found");
};

export default notFoundHandler;
