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
const HttpMixin_1 = require("./Mixins/HttpMixin");
const Utils_1 = require("./Utils");
class BaseAccessToken {
    constructor(app) {
        this.requestMethod = 'GET';
        this.token = '';
        this.queryName = '';
        this.tokenKey = 'access_token';
        this.endpointToGetToken = '';
        this.app = null;
        this.app = app;
    }
    getCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    getEndpoint() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.endpointToGetToken) {
                throw new Error('Unset the endpoint of AccessToken');
            }
            return this.endpointToGetToken;
        });
    }
    getCacheKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'easywechat.kernel.access_token.' + Utils_1.createHash(JSON.stringify(yield this.getCredentials()), 'md5');
        });
    }
    requestToken(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = {
                url: yield this.getEndpoint(),
                method: this.requestMethod,
            };
            if (this.requestMethod == 'POST') {
                payload['json'] = true;
                payload['body'] = credentials;
            }
            else {
                payload['qs'] = credentials;
            }
            return yield this.doRequest(payload);
        });
    }
    ;
    getToken(refresh = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let cacheKey = yield this.getCacheKey();
            let cache = this.app.getCache();
            if (!refresh && (yield cache.has(cacheKey))) {
                return yield cache.get(cacheKey);
            }
            let res = yield this.requestToken(yield this.getCredentials());
            yield this.setToken(res[this.tokenKey], res.expires_in || 7200);
            return res[this.tokenKey];
        });
    }
    setToken(access_token, expires_in = 7200) {
        return __awaiter(this, void 0, void 0, function* () {
            let cacheKey = yield this.getCacheKey();
            let cache = this.app.getCache();
            yield cache.set(cacheKey, access_token, expires_in);
            if (!cache.has(cacheKey)) {
                throw new Error('Failed to cache access token.');
            }
            return this;
        });
    }
    ;
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getToken(true);
            return this;
        });
    }
    getRefreshedToken() {
        return this.getToken(true);
    }
    getTokenKey() {
        return this.tokenKey;
    }
    applyToRequest(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            payload['qs'] = payload['qs'] || {};
            if (!payload['qs'][this.queryName || this.tokenKey]) {
                payload['qs'][this.queryName || this.tokenKey] = yield this.getToken();
            }
            return payload;
        });
    }
    // Rewrite by HttpMixin
    doRequest(payload, returnResponse = false) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
;
Utils_1.applyMixins(BaseAccessToken, [HttpMixin_1.default]);
exports.default = BaseAccessToken;
