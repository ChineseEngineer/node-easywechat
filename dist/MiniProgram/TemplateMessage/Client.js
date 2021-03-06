'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../../OfficialAccount/TemplateMessage/Client");
class Client extends Client_1.default {
    constructor() {
        super(...arguments);
        this.API_SEND = 'cgi-bin/message/wxopen/template/send';
        this.message = {
            touser: '',
            template_id: '',
            page: '',
            form_id: '',
            data: '',
            emphasis_keyword: '',
        };
        this.required = ['touser', 'template_id', 'form_id'];
    }
    list(offset, count) {
        return this.httpPostJson('cgi-bin/wxopen/template/library/list', {
            offset,
            count,
        });
    }
    get(id) {
        return this.httpPostJson('cgi-bin/wxopen/template/library/get', {
            id,
        });
    }
    add(id, keyword) {
        return this.httpPostJson('cgi-bin/wxopen/template/library/add', {
            id,
            keyword,
        });
    }
    delete(template_id) {
        return this.httpPostJson('cgi-bin/wxopen/template/del', {
            template_id,
        });
    }
    getTemplates(offset, count) {
        return this.httpPostJson('cgi-bin/wxopen/template/list', {
            offset,
            count,
        });
    }
}
exports.default = Client;
