"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidateMiddleware = void 0;
function schemaValidateMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error)
            return res.status(422).send(error.details.map(({ message }) => message));
        res.locals.test = req.body;
        next();
    };
}
exports.schemaValidateMiddleware = schemaValidateMiddleware;
//# sourceMappingURL=schemaValidateMiddleware.js.map