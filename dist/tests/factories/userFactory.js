"use strict";
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
const faker_1 = require("@faker-js/faker");
const database_1 = __importDefault(require("../../src/databases/database"));
function registerUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordFaker = faker_1.faker.internet.password();
        return {
            email: faker_1.faker.internet.email(),
            password: passwordFaker,
            passwordConfirm: passwordFaker,
        };
    });
}
function createLogin(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.default.user.findUnique({ where: { email } });
        // const user = await client.user.create({
        //   data: {
        //     email,
        //     password: bcrypt.hashSync(password, 10),
        //   },
        // });
        return Object.assign(Object.assign({}, user), { password: password });
    });
}
const userFactory = {
    registerUser,
    createLogin,
};
exports.default = userFactory;
//# sourceMappingURL=userFactory.js.map