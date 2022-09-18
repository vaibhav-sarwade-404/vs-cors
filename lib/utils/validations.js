"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesElementMatchesToArrayElements = exports.isEmptyObject = exports.isFunction = exports.isNumber = exports.isBoolean = exports.isString = void 0;
var isString = function (str) {
    return Object.prototype.toString.call(str) === "[object String]";
};
exports.isString = isString;
var isBoolean = function (str) {
    return Object.prototype.toString.call(str) === "[object Boolean]";
};
exports.isBoolean = isBoolean;
var isNumber = function (str) {
    return Object.prototype.toString.call(str) === "[object Number]";
};
exports.isNumber = isNumber;
var isFunction = function (func) {
    return Object.prototype.toString.call(func) === "[object Function]";
};
exports.isFunction = isFunction;
var isEmptyObject = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]" &&
        JSON.stringify(obj) !== "{}";
};
exports.isEmptyObject = isEmptyObject;
/**
 * This is helper function which will return true if provided string is present in array of strings / regexp
 * @param array {string[]} - string array can contain strings as well as RegExp
 * @param ele {string}
 */
var doesElementMatchesToArrayElements = function (array, ele) {
    if (!Array.isArray(array) || !array.length) {
        return false;
    }
    return !!array.find(function (_ele) {
        if (isString(_ele)) {
            if (ele === _ele) {
                return _ele;
            }
        }
        else if (_ele instanceof RegExp) {
            return _ele.test(ele);
        }
    });
};
exports.doesElementMatchesToArrayElements = doesElementMatchesToArrayElements;
