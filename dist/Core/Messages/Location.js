'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
class Location extends Message_1.Message {
    constructor() {
        super(...arguments);
        this.type = 'location';
        this.properties = [
            'latitude',
            'longitude',
            'scale',
            'label',
            'precision',
        ];
    }
}
exports.Location = Location;
;
