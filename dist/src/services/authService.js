"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.loginUser = exports.registerUser = void 0;
const errorUtils_1 = require("./../utils/errorUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRepository = __importStar(require("../repositories/authRepository"));
const errorUtils_2 = require("../utils/errorUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
function registerUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield authRepository.findByEmail(data.email);
        if (userExists) {
            throw (0, errorUtils_2.conflictError)(`User already registered`);
        }
        if (data.password !== data.passwordConfirm)
            throw (0, errorUtils_1.unprocessableEntity)(`Passwords not equals`);
        const NUM_CRYPT = Number(process.env.NUM_CRYPT);
        const passcrypt = bcrypt_1.default.hashSync(data.password, NUM_CRYPT);
        const dataUser = {
            email: data.email,
            password: passcrypt,
        };
        yield authRepository.insert(dataUser);
    });
}
exports.registerUser = registerUser;
function loginUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield authRepository.findByEmail(data.email);
        if (!userExists) {
            throw (0, errorUtils_2.notFoundError)(`User not registered`);
        }
        const comparePassword = bcrypt_1.default.compare(data.password, userExists.password);
        if (!comparePassword) {
            throw (0, errorUtils_2.unauthorizedError)(`Email or password incorrect`);
        }
        const token = jsonwebtoken_1.default.sign({ userId: userExists.id }, `${process.env.JWT_SECRET}`, {
            expiresIn: 60 * 60 * 24,
        });
        return token;
    });
}
exports.loginUser = loginUser;
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authRepository.findById(userId);
        if (!user)
            throw (0, errorUtils_2.notFoundError)("User not found");
        return user;
    });
}
exports.findUserById = findUserById;
//# sourceMappingURL=authService.js.map