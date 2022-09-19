"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleErrorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Internal server error");
};
exports.default = handleErrorMiddleware;
//# sourceMappingURL=errorHandlerMiddleware.js.map