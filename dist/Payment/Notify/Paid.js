'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./Handler");
class PaidHandler extends Handler_1.default {
    handle(closure) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof closure != 'function') {
                throw new Error('Should pass an closure function');
            }
            this.strict(yield closure.apply(this, [
                yield this.getMessage(),
                this.setFail,
            ]));
            return this.toResponse();
        });
    }
}
exports.default = PaidHandler;
