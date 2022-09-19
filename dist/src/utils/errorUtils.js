"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unprocessableEntity = exports.conflictError = exports.notFoundError = exports.unauthorizedError = exports.badRequest = void 0;
const badRequest = (message) => {
    return {
        status: 400,
        message,
    };
};
exports.badRequest = badRequest;
const unauthorizedError = (message) => {
    return {
        status: 401,
        message,
    };
};
exports.unauthorizedError = unauthorizedError;
const notFoundError = (message) => {
    return {
        status: 404,
        message,
    };
};
exports.notFoundError = notFoundError;
const conflictError = (message) => {
    return {
        status: 409,
        message,
    };
};
exports.conflictError = conflictError;
const unprocessableEntity = (message) => {
    return {
        status: 422,
        message,
    };
};
exports.unprocessableEntity = unprocessableEntity;
//# sourceMappingURL=errorUtils.js.map