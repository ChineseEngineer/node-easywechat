'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const BaseClient_1 = require("../../Core/BaseClient");
const Utils_1 = require("../../Core/Utils");
class Client extends BaseClient_1.default {
    constructor() {
        super(...arguments);
        this.baseUrl = 'https://api.weixin.qq.com/wxa/';
    }
    removeUserStorage(openid, sessionKey, key) {
        let data = {
            key: key,
        };
        let query = {
            openid: openid,
            sig_method: 'hmac_sha256',
            signature: Utils_1.createHmac(JSON.stringify(data), sessionKey, 'sha256'),
        };
        return this.httpPostJson('remove_user_storage', data, query);
    }
    setUserStorage(openid, sessionKey, kvList) {
        let data = {
            kv_list: this.formatKVLists(kvList),
        };
        let query = {
            openid: openid,
            sig_method: 'hmac_sha256',
            signature: Utils_1.createHmac(JSON.stringify(data), sessionKey, 'sha256'),
        };
        return this.httpPostJson('set_user_storage', data, query);
    }
    formatKVLists(params) {
        let formatted = [];
        for (let key in params) {
            formatted.push({
                name: key,
                value: params[key],
            });
        }
        return formatted;
    }
}
exports.default = Client;
