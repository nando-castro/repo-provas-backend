"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    const NUM_CRYPT = Number(process.env.NUM_CRYPT);
    const result = bcrypt_1.default.hashSync(password, NUM_CRYPT);
    return result;
};
exports.hashPassword = hashPassword;
const comparePassword = (password, passwordCompare) => {
    const result = bcrypt_1.default.compare(password, passwordCompare);
    return result;
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=encryptUtils.js.map