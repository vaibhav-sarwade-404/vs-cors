"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectKeyFromValue = void 0;
/**
 * This helper function will return first key with value
 * @param obj - Object
 * @param value - value to find
 * @returns {string | undefined}
 */
var getObjectKeyFromValue = function (obj, value) {
    var objKeysArr = Object.keys(obj);
    if (!objKeysArr.length) {
        return;
    }
    return objKeysArr.find(function (objKey) { return obj[objKey] === value; });
};
exports.getObjectKeyFromValue = getObjectKeyFromValue;
