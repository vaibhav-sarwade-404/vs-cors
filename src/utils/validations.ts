const isString = (str: any) =>
  Object.prototype.toString.call(str) === "[object String]";

const isBoolean = (str: any) =>
  Object.prototype.toString.call(str) === "[object Boolean]";

const isNumber = (str: any) =>
  Object.prototype.toString.call(str) === "[object Number]";

const isFunction = (func: any) =>
  Object.prototype.toString.call(func) === "[object Function]";

const isEmptyObject = (obj: any) =>
  Object.prototype.toString.call(obj) === "[object Object]" &&
  JSON.stringify(obj) !== "{}";

/**
 * This is helper function which will return true if provided string is present in array of strings / regexp
 * @param array {string[]} - string array can contain strings as well as RegExp
 * @param ele {string}
 */
const doesElementMatchesToArrayElements = (
  array: Array<string | RegExp>,
  ele: string
) => {
  if (!Array.isArray(array) || !array.length) {
    return false;
  }
  return !!array.find(_ele => {
    if (isString(_ele)) {
      if (ele === _ele) {
        return _ele;
      }
    } else if (_ele instanceof RegExp) {
      return _ele.test(ele);
    }
  });
};

export {
  isString,
  isBoolean,
  isNumber,
  isFunction,
  isEmptyObject,
  doesElementMatchesToArrayElements
};
