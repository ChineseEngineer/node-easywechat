'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
class TextCard extends Message_1.Message {
    constructor() {
        super(...arguments);
        this.type = 'textcard';
        this.properties = [
            'title',
            'description',
            'url',
        ];
    }
}
exports.TextCard = TextCard;
;
