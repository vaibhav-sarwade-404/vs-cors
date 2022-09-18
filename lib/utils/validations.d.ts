declare const isString: (str: any) => boolean;
declare const isBoolean: (str: any) => boolean;
declare const isNumber: (str: any) => boolean;
declare const isFunction: (func: any) => boolean;
declare const isEmptyObject: (obj: any) => boolean;
/**
 * This is helper function which will return true if provided string is present in array of strings / regexp
 * @param array {string[]} - string array can contain strings as well as RegExp
 * @param ele {string}
 */
declare const doesElementMatchesToArrayElements: (array: Array<string | RegExp>, ele: string) => boolean;
export { isString, isBoolean, isNumber, isFunction, isEmptyObject, doesElementMatchesToArrayElements };
